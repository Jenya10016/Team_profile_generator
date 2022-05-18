const { Employee } = require('./Employee');

class Engineer extends Employee{
constructor(id, name, email, github) {
        super(id, name, email);
        this._github = github;
    }

    getGithub(){
        return this._github;
    }

    getRole() {
        return 'Engineer';
    }
}


module.exports = {
    Engineer
};