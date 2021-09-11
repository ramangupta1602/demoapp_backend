const express = require("express");
const router = express.Router();
const validate = require("express-joi-validate");
const userValidation = require("../helpers/joi.validation");
const userCtrl = require("../controllers/user.controller");


//signup
router.route("/create").post(validate(userValidation.createUser), userCtrl.createuser);

//login
router.route("/login").post(validate(userValidation.login), userCtrl.login);

//addproject
router.route("/addproject").post(validate(userValidation.addProject), userCtrl.addProject);

//addmember
router.route('/find-user').get( userCtrl.addMember);






module.exports = router;



//login
// router.post("/loginn", async (req, res, next) => {
//     userColl
//       .find({ email: req.body.password })
//       .exac()
//       .then((user) => {
//         if (user.length < 1) {
//           res.status(401).json({ msg: "user not exist" });
//         }
//         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        //   if (!result) {
        //     res.status(401).json({ msg: "password not matched" });
        //   }
//           if (result) {
//             const token = jwt.sign(
//               { email: user[0].email, type: user[0].type },
//               "jsonwebtoken",
//               { expiresIn: "24h" }
//             );
//             res
//               .status(200)
//               .json({ email: user[0].email, type: user[0].type, token: token });
//           }
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({ err: err });
//       });
//   });
  