exports.mainMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
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