const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if (req.session.user) return res.render('logged');
    return res.render('login');
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

exports.login = async (req, res) => {
    const login = new Login(req.body);

    try {
        await login.login();
    }
    catch (error) {
        console.error(error);
        return res.render('404');
    }

    if (login.hasError()) {
        req.flash('errors', login.errors);
        req.session.save(() => {
            return res.redirect('/login/index');
        });
        return;
    }

    req.flash('success', 'Você entrou com sucesso!');
    req.session.user = login.user;
    req.session.save(() => {
        return res.redirect('/login/index');
    });
    return;
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};