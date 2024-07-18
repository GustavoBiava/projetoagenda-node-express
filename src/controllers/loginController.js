const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res) => {
    const login = new Login(req.body);

    try {
        await login.register();
    }
    catch (error) {
        console.error(error);
        return res.render('404');
    }

    if (login.hasError()) {
        req.flash('errors', login.errors);
        req.session.save(() => {
            return res.redirect('index');
        });
        return;
    }

    req.flash('success', 'Conta criada com sucesso!');
    req.session.save(() => {
        return res.redirect('index');
    });
};