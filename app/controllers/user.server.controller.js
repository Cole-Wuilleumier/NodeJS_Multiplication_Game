exports.login = function(req, res){
    req.session.name = req.body.name;
    req.session.room = req.body.room;
    console.log(req.session.name + " has joined " + req.session.room + " at " + Date.now());
    return res.redirect('/');
};
