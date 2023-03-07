exports.getLogin = (req,res) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{isLoggedIn:req.session.isLoggedIn});
};

exports.postLogin = (req,res) => {
    // res.setHeader('set-cookie','isLoggedIn=true');
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.postLogout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}