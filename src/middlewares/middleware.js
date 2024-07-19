exports.mainMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.CSRFMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.checkCSRFError = (error, req, res, next) => {
    if (error) {
        return res.render('404');
    }
    next();
};

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login!');
        req.session.save(() => {
            return res.redirect('/login/index'); 
        });
        return;
    }
    next();
};