exports. homepage = (req, res) => {
    res.render('index', {
        title: 'Titulo principal',
        numbers: [0, 1, 2, 3, 4, 5]
    });
};

exports.receivePost = (req, res) => {
    res.send(`Olá ${req.body.client}, sou sua rota de POST`);
    return;
};