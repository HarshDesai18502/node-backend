exports.getLogin = (req,res,next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{isLoggedIn:req.session.isLoggedIn});
};

exports.postLogin = (req,res,next) => {
    // res.setHeader('set-cookie','isLoggedIn=true');
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.postLogout = (req,res,next) => {
    req.session.destroy();
    res.redirect('/');
}