exports.mainMiddleware = (req, res, next) => {
    res.locals.estouEmTodasAsRotas = 'Estou em todas as rotas =)';
    console.log('Passei pelo middleware global');
    next();
};

exports.CSRFMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.checkCSRFError = (error, req, res, next) => {
    if (error && error.code === 'EBADCSRFTOKEN') {
        return res.render('error');
    }
};