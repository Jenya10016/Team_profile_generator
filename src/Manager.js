const { Employee } = require('./Employee');

class Manager extends Employee { 
constructor(id, name, email, officeNumber) {
        super(id, name, email);
        this._officeNumber = officeNumber;
    }

    getOfficeNumber(){
        return thie._officeNumber;
    }

    getRole() {
        return 'Manager';
    }
}

module.exports = {
    Manager
};