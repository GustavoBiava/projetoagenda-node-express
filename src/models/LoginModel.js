const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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
        if (!(validator.isEmail(this.body.email))) this.errors.push('E-mail inválido');
        if (this.body.password.length < 3 || this.body.password.length >= 50) this.errors.push('Tamanho de senha inválido! (3 - 50)');
    }

    async register() {
        this.validate();
        if (this.hasError()) return;
        
        await this.userExists();
        if (this.hasError()) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        
        this.user = await LoginModel.create({
            email: this.body.email,
            password: this.body.password
        });
    }

    async login() {
        this.validate();
        if (this.hasError()) return;

        this.user = await LoginModel.findOne({ email: this.body.email });
        if (!this.user) {
            this.errors.push('Usuário não existe!');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida!');
            this.user = null;
            return;
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if (user) this.errors.push('Usuário já existente!');
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