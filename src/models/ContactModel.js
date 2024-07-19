const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phoneNumber: { type: String, required: false, default: '' },
    created: { type: Date, default: Date.now()}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contact.prototype.register = async function() {
    this.validate();
    if (this.hasError()) return;
    this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validate = function() {
    this.cleanUp();
    if (!this.body.email || !(validator.isEmail(this.body.email))) this.errors.push('E-mail inválido');
    if (!this.body.name) this.errors.push('Nome é um campo o obrigatório');
    if (!this.body.email && !this.body.phoneNumber) {
        this.errors.push('Contato deve conter pelo menos um email ou um telefone');
    }
}

Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

   this.body = {
        name: this.body.name,
        surname: this.body.surname,
        email: this.body.email,
        phoneNumber: this.body.phoneNumber
    };
}

Contact.prototype.edit = async function(id) {
    if (typeof id !== 'string') return;
    this.validate();
    if (this.hasError()) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
};

Contact.findById = async function(id) {
    if (typeof id !== 'string') return;
    const contact = ContactModel.findById(id);
    return contact;
};

Contact.prototype.hasError = function() {
    return this.errors.length > 0;
}


module.exports = Contact;