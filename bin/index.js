#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");

figlet("react-cli", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

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
// program.name("react-cli").usage("<command> [option]");

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

// program.parse(process.argv);
// const options = program.opts();
// console.log(options);
