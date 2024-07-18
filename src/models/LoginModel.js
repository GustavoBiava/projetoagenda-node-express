const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {

    constructor(body) {
        this.body = body;    
        this.errors = [];
        this.user = null;
    }

    validate() {
        this.cleanUp();
        if (!(validator.isEmail(this.body.email))) this.errors.push('Invalid E-mail');
        if (this.body.password.length < 3 || this.body.password.length >= 50) this.errors.push('Invalid password size! (3 - 50)');

    }

    async register() {
        this.validate();
        if (this.hasError()) return;

        try {
            this.user = await LoginModel.create({
                email: this.body.email,
                password: this.body.password
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

       this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

    hasError() {
        return this.errors.length > 0;
    }
    
}

module.exports = Login;