const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact', { contact: {} });
};

exports.register = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.register();
    }
    catch (error) {
        console.error(error);
        return res.render('404');
    }

    if (contact.hasError()) {
        req.flash('errors', contact.errors);
        req.session.save(() => {
            return res.redirect('/contact/index');
        });
        return;
    }

    req.flash('success', 'Contato criado com sucesso!');
    req.session.save(() => {
        return res.redirect(`/contact/index/${contact.contact._id}`);
    });
    return;
};

exports.editIndex = async function (req, res) {
    if (!req.params.contactId) return res.render('404');
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) return res.render('404');

    res.render('contact', { contact });
};

exports.edit = async function (req, res) {
    try {
        if (!req.params.contactId) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.contactId);
        
        if (contact.hasError()) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                return res.redirect(`/contact/index/${req.params.contactId}`);
            });
            return;
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => {
            return res.redirect(`/contact/index/${contact.contact._id}`);
        });
        return;
    }
    catch (error) {
        console.error(error);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if (!req.params.contactId) return res.render('404');
    const contact = await Contact.delete(req.params.contactId);
    if (!contact) return res.render('404');

    req.flash('success', 'Contato excluído com sucesso!');
    req.session.save(() => {
        return res.redirect(`/`);
    });
    return;
};