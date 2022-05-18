class Employee {
    constructor(id, name, email) {
        this._id = id;
        this._name = name;
        this._email = email;
    }
        getId(){
            return this._id;
        }

        getRole(){
            return 'Employee';
        }

        getName(){
            return this._name;
        }

        getEmail(){
            return this._email;
        }
}

module.exports = {
    Employee
};