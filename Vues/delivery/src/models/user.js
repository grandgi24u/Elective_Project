export default class User {
    constructor(id, name, surname, email, address, password, roleId) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.address = address;
        this.password = password;
        this.roleId = roleId;
    }
}