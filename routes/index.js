//Homepage
exports.index = function(req, res) {
    res.render('index',{title: 'Welcome!'});
};

//User List
exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e, docs){
            res.render('userlist', {
                "userlist" : docs,
                title: "User List"
            });
        });
    };
};

//Add User Form
exports.adduser = function(db) {
    return function(req, res) {
        //Get Input Submissions
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var username = req.body.username;
        var email = req.body.email;
        var passport = req.body.passport;
        
        //Set Collection
        var collection = db.get('usercollection');
        
        //Submit to the DB
        collection.insert({
            "first_name" : first_name,
            "last_name" : last_name,
            "username" : username,
            "email" : email,
            "passport" : passport
        }, function(err, doc) {
            if(err) {
                res.send('There was a problem');
            } else {
                res.location('userlist');
                res.redirect('userlist');
            }
        }
                         );
    }
};