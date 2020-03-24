
const express = require('express');
const router = express.Router();
const {
    User
} = require("../models/user");


const {
    auth
} = require("../middleware/auth");

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/auth", auth, (req, res) => {
    console.log("???");
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        admin:req.user.admin,
    });
});

router.get("/allusers", (req, res) => {
    User.find().then(datas => {
        console.log(datas);
        res.json(datas);
    });
})

router.post("/register", (req, res) => {
    const data = {
        firstname: req.body.firstname,
        email: req.body.email,
        role: req.body.role,
        admin: req.body.admin
    }
    console.log(req.body);
    console.log(data);
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "Wrong password"
                })
            };

            user.generateToken((err, user) => {
                console.log(user);
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res.cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                        role: user.role,
                        name: user.firstName 
                    });
            });
        });
    });
});



router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        token: "",
        tokenExp: ""
    }, (err, doc) => {
        if (err) return res.json({
            success: false,
            err
        });
        return res.status(200).send({
            success: true
        });
    });
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    User.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/update/:id", (req, res, next) => {
    const id = req.params._id;
    User.findOneAndUpdate({
            id: id
        })
        .then(user => {

            user.email = req.user.email;
            user.name = req.user.name;
            user.image = req.user.image;

            user.save()
                .then(() => res.json('Exerise updates:!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))

});


module.exports = router;