const { Employee } = require('./Employee');

class Intern extends Employee{
constructor(id, name, email, school) {
        super(id, name, email);
        this._school = school;
    }

    getSchool(){
        return this._school;
    }

    getRole() {
        return 'Intern';
    }
}

module.exports = {
    Intern
};