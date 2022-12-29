const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "User Profile"
    })

};

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Sign Up",
        // message: ""
    })
};

module.exports.signIn = function (req, res) {
    // console.log(req);
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Sign In"
    });
};
//sign up the user
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding the user in signing up');
            return;
        }
        if (!user) {
            User.find().count(function (err, count) {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    var userDetails = {
                        patient_id: count + 1,
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name,
                        gender: req.body.gender
                    };
                    User.create(userDetails, function (err, user) {
                        if (err) {
                            console.log(err);
                            console.log('Error in creating the user while signing up');
                            res.redirect('/users/create');
                        }
                        return res.redirect('/users/sign-in');
                    })
                }
            })

        }
        else {
            return res.redirect('back');

        }
    });

}

//sign in and create a session for user
module.exports.createSession = function (req, res) {
    return res.redirect('/users/profile');
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports.fixAppointment = function (req, res) {
    var obj = new User(res.locals.user);
    obj.appointments.push({
        date: req.body.date,
        slot: req.body.slot,
        doctor_id: req.body.doctor_id
    });
    obj.save();
    console.log('Successfully created an appointment');
    return res.redirect('/users/profile/');
}

module.exports.viewAppointments = function(req,res){
    return res.render('user_appointments',{
        title: 'My appointments'
    });
}
