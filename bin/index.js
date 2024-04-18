#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs-extra");
const gitClone = require("git-clone");

// figlet("react-cli", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

// const spinner = ora("Loading unicorns").start();
// setTimeout(() => {
//   spinner.text = "网络较慢";
//   spinner.color = "green";
// }, 2000);

// ----------- inquirer ----------
// inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What is your name?",
//       default: "xxx",
//     },
//     {
//       type: "confirm",
//       name: "six",
//       message: "是男人吗?",
//       default: false,
//     },
//   ])
//   .then((answers) => {
//     console.log(answers);
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// ----------- chalk ----------
// console.log(chalk.red("zjzzzz"));

// ----------- program ----------
// 首行提示
program.name("react-cli").usage("<command> [option]");

// 版本号
program.version(`${require("../package.json").version}`);

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
      {
        type: "list",
        message: "是否要用ts",
        name: "ts",
        choices: [
          {
            name: "是",
            value: true,
          },
          {
            name: "否",
            value: false,
          },
        ],
      },
    ]);
    console.log(res);
    // gitClone()
  });

program.on("--help", () => {
  console.log("react");
});

// program
//   .option("-d, --debug", "是否开启调试模式")
//   .option("-e, --env <env>", "环境变量", "prod")
//   .option("-p, --port <port>", "端口号", "3000");

// program
//   .command("clone <source> [destination]")
//   .description("clone a repository into a newly created directory")
//   .action((source, destination) => {
//     console.log("clone command called");
//   });

program.parse(process.argv);
const options = program.opts();
