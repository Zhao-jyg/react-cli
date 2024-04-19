#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs-extra");
const gitClone = require("git-clone");
const downgit = require("download-git-repo");

const projectList = {
  vue: "github:chuzhixin/vue-admin-better",
  react: "github:marmelab/react-admin",
  "react&ts": "",
  "vue&ts": "",
};

// 首行提示
program.name("react-cli").usage("<command> [option]");

// 版本号
program.version(`${require("../package.json").version}`);

// 艺术字展示
// program.on("--help", function () {
//   console.log(
//     figlet.textSync("react-cli", {
//       font: "Ghost",
//       horizontalLayout: "default",
//       verticalLayout: "default",
//       width: 100,
//       whitespaceBreak: true,
//     })
//   );
// });

// 创建项目的命令
program
  .command("create <app-name> [destination]")
  .description("创建项目")
  .action(async (name, others) => {
    console.log(name, process.cwd(), path.join(process.cwd(), name));
    const targetPath = path.join(process.cwd(), name);
    // 1. 判断当前目录有没有name 文件夹
    if (fs.existsSync(path.join(process.cwd(), name))) {
      const res = await inquirer.prompt([
        {
          type: "confirm",
          name: "isOverwrite",
          message: "当前目录下已经存在该文件夹，是否覆盖?",
          default: false,
        },
      ]);
      if (!res.isOverwrite) return;
      fs.removeSync(targetPath);
    }

    // 2.新建
    const res = await inquirer.prompt([
      {
        type: "list",
        message: "选择哪个框架？",
        name: "type",
        choices: [
          {
            name: "vue",
            value: "vue",
          },
          {
            name: "react",
            value: "react",
          },
        ],
      },
      // {
      //   type: "list",
      //   message: "是否要用ts",
      //   name: "ts",
      //   choices: [
      //     {
      //       name: "是",
      //       value: true,
      //     },
      //     {
      //       name: "否",
      //       value: false,
      //     },
      //   ],
      // },
    ]);
    const key = res.type + (res.ts ? "&ts" : "");
    const spinner = ora("正在加载项目模板...").start();
    downgit(projectList[key], targetPath, { clone: false }, function (err) {
      if (!err) {
        fs.remove(path.resolve(targetPath, ".git"));
        spinner.succeed("项目模板加载完成！");
        console.log("now run:");
        console.log(chalk.green(`\n  cd ${name}`));
        console.log(chalk.green("  npm install"));
        console.log(
          chalk.green(`  npm run ${res.type === "react" ? "start" : "dev"}\n`)
        );
      } else {
        spinner.fail(chalk.red("项目模板加载失败，请重新获取！"));
      }
    });
  });

program.parse(process.argv);
