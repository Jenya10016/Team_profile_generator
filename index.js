const fs = require('fs');
const inquirer = require('inquirer');
// Employee classes
const { Manager } = require('./src/Manager.js');
const { Intern } = require('./src/Intern.js');
const { Engineer } = require('./src/Engineer.js');
const { managerTemplate, engineerTemplate, internTemplate } = require('./src/templates.js');
// Generator Function
const { htmlGenerator } = require('./src/htmlGenerator');

let employees = [];
let htmlTemplate = [];
let index = 1;


const addEmployee = () => inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'What type of employee would you like to add?',
    choices: ['Manager', 'Engineer', 'Intern']
}]).then(answers => {
    let questions = [{
        type: 'input',
        name: 'name',
        message: 'What is the first name?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email?'
    }];
    if (answers.type === 'Manager') {
        questions.push({
            type: 'input',
            name: 'office',
            message: 'office number?'
        });
        inquirer.prompt(questions)
            .then(answers => {
                const newManager = new Manager((index++), answers.name, answers.email, answers.office);
                employees.push(newManager);
                let data = managerTemplate(newManager);
                htmlTemplate.push(data);
                inquirer.prompt([{
                        type: 'confirm',
                        name: 'continue',
                        message: 'Would you like to add another employee?',
                    }])
                    .then(answers => {
                        if (answers.continue) {
                            addEmployee();
                        } else {
                           finishTemplate();
                        }
                    })
            })
    } else if (answers.type === 'Engineer') {
        questions.push({
            type: 'input',
            name: 'github',
            message: 'GitHub username?'
    });
         
        inquirer.prompt(questions).then(answers => {
                const newEngineer = new Engineer(index++, answers.name, answers.email, answers.github);
                employees.push(newEngineer);
                let data = engineerTemplate(newEngineer);
                htmlTemplate.push(data);
                inquirer.prompt([{
                        type: 'confirm',
                        name: 'continue',
                        message: 'Would you like to add another employee?',
                    }])
                    .then(answers => {
                        if (answers.continue) {
                            addEmployee();
                        } else {
                            finishTemplate();
                        }
                    })
            })
    } else if (answers.type === 'Intern') {
        questions.push({
            type: 'input',
                    name: 'school',
                    message: 'What is their school?'
        });
        inquirer.prompt(questions).then(answers => {
            const newIntern = new Intern(index++, answers.name, answers.email, answers.school);
            employees.push(newIntern);
            let data = internTemplate(newIntern);
            htmlTemplate.push(data);
            inquirer.prompt([{
                        type: 'confirm',
                        name: 'continue',
                        message: 'Would you like to add another employee?',
                    }])
                    .then(answers => {
                        if (answers.continue) {
                            addEmployee();
                        } else {
                           finishTemplate();
                        }
                    })
            });
    }
})
.catch(err => {
    if (err) {
        console.error(err);
    }
});

function finishTemplate() {
    fs.writeFile('./dist/teaminfo.html', htmlGenerator(htmlTemplate.join('')), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

addEmployee();