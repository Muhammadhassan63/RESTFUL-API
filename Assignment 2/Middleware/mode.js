// // using cookies
app.use(cookieParser('12345-67890-09876-54321',));
function authorize(req, res, next){
    console.log(req.signedCookies);
    if(!req.signedCookies.user){    
        var authorizeHeader = req.headers.authorization;
        if(!authorizeHeader){
            var err = new Error("You are not authenticated");
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
        var auth = new Buffer.from(authorizeHeader.split(' ')[1],'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
        if(username=='hassan' && password=='sp20bse061'){
            res.cookie('user','admin',{signed: true});
            next();
        }
        else{
            var err = new Error("Your are not authenticated");
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
    }
    else{
        if(req.signedCookies.user=='admin'){
            next();
        }
        else{
            var err = new Error("Your are not authenticated");
            err.status = 401;
            next(err);
        }
    }
}