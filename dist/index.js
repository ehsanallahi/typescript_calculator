import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to the CLI Calculator App in TypeScript - Where math meets simplicity!');
    await sleep(2000);
    rainbowTitle.stop();
    const calculatorInterface = `
    _____________________
    |  _________________  |
    | |   Ehsan Allahi  | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
  `;
    const calculatorAnimation = chalkAnimation.rainbow(calculatorInterface); // Add animation
    await sleep(2000); // 
    calculatorAnimation.stop();
}
async function askQuestion() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'operator',
                message: 'Which mathematical operation do you want to perform?\n',
                choices: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
            },
            {
                type: 'number',
                name: 'num1',
                message: 'Enter the first number:',
            },
            {
                type: 'number',
                name: 'num2',
                message: 'Enter the second number:',
            },
        ]);
        let result;
        switch (answers.operator) {
            case 'Addition':
                result = answers.num1 + answers.num2;
                break;
            case 'Subtraction':
                result = answers.num1 - answers.num2;
                break;
            case 'Multiplication':
                result = answers.num1 * answers.num2;
                break;
            case 'Division':
                if (answers.num2 === 0) {
                    console.log(chalk.red('Error: Division by zero is not allowed.'));
                    return;
                }
                result = answers.num1 / answers.num2;
                break;
            default:
                console.log(chalk.red('Error: Invalid operator selected.'));
                return;
        }
        console.log(`Result: ${chalk.bold.bgGreenBright(result)}`);
        // Ask the user if they want to continue
        const continueAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to perform another calculation?',
                default: true,
            },
        ]);
        if (continueAnswer.continue) {
            await askQuestion(); // Restart the calculator
        }
        else {
            console.log('Thank you for using the calculator.Follow me on Github @ehsanallahi ,Goodbye!');
        }
    }
    catch (error) {
        console.error(chalk.red('An error occurred:', error));
    }
}
async function main() {
    await welcome();
    await askQuestion();
}
main();
