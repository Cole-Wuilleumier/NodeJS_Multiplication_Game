exports.login = function(req, res){
    req.session.name = req.body.name;
    console.log(req.session.name + " has joined at " + Date.now());
    return res.redirect('/');
};
