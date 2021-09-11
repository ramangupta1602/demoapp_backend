const router = require("express").Router();
const { mongodb, ObjectId } = require("mongodb");
var db = require("../server");
var upload=require('./multer');
var nodemailer=require('nodemailer');
// const employee = db.collection("employee");
// const mentor = db.collection("mentor");
const bcrypt=require('bcryptjs');
const userValidation=require('../helpers/joi.validation');
const createHttpError = require("http-errors");


//employee_sign_up
// router.post('/register', async(req,res,next)=>{
//   try{
//       const result =await userValidation.validate(req.body) 
//       const doesExist=await userValidation.findOne({email:result.email})
//       if(doesExist) throw createError.conflict(`${result.email} is already been register`)

//       const user = new userValidation(result)
//       const savedUser= await user.save()

//       res.send(savedUser)
//   }
//   catch(error){
//       if(error.isJoi===true) error.status=422
//   }
// })

router.post("/signup", function (req, res) {
    db.collection("information").insertOne(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        Type: req.body.Type,
      },
      function (err, data) {
        if (err) {
          res.status(500).json({result:false,data:data});
        } else {
            res.status(200).json({result:true ,data:data});
          }
        }
       
      
    );
});

//employee_signin--
router.post("/signin", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  db.collection('information').find({ email: email , password:password})
      .toArray(function (err, data) {
        if (err) {
          res.status(500).json({result:false,results:data});
        } else  {
                  if (data.length == 0) {
                    res.status(200).json({result:false});
                  } else{
            res.status(200).json({result:true,results:data});
          }
        }
      });
});



//fetch employee
router.post("/fetchemployee", function (req, res) {

 const Type=req.body.Type;
  db.collection('information').find({ Type:Type })
      .toArray(function (err, data) {
        if (err) {
          res.status(500).json({result:false});
        } else  {
                  if (data.length == 0) {
                    res.status(200).json({result:false});
                  } else{
            res.status(200).json({result:true,row:data});
          }
        }
      });
    
});

router.get("/fetchemp", function (req, res) {

  db.collection("information").findOne({ Type: "employee" }, function (err, result) {
    if (err) {
      console.log(err);
    }else{
    res.status(200).json({ data: result });
    }
  });
});
//add project
router.post("/addproject",upload.single('document'), function (req, res) {

  db.collection("addProject").insertOne(
    {
      timeline: req.body.timeline,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      document: req.body.myfilename,
    },
    function (err, data) {
      if (err) {
        res.status(500).json({result:false});
      } else {
          res.status(200).json({result:true,data:data});
        }
      } 
  )
});



//emailsent
router.post('/gmail',function(req,res){


var transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:"ramangupta5554@gmail.com",
    pass:'guruji213'
  }

});

var mailOptions = {
  from:req.body.from,
  to:req.body.to,
  subject:req.body.subject,
  text:req.body.text
};
 
transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error);
  }else{
    console.log('Email sent :' + info.response);
  }
})
})


//mentor_signin--
router.post("/mentorsignin", function (req, res) {
  db.collection("mentor")
    .aggregate([
      {
        $match: {
          $and: [
            { menpassword: req.body.menpassword },
          ],
        },
      },
    ])
    .toArray(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        if (data.length == 0) {
          res.send({ result: false });
        } else {
          res.send({ result: true, data: data });
        }
      }
    });
});
// const mendepartment = req.body.mendepartment;
  // if (!mendepartment) {
    // db.collection("information").insertOne(
    //   {
    //     empname: req.body.empname,
    //     empemail: req.body.empemail,
    //     empphone: req.body.empphone,
    //     empaddress: req.body.empaddress,
    //     emppassword: req.body.emppassword,
    //     Type: "employee",
    //   },
    //   function (err, data) {
    //     if (err) {
    //       res.status(500).json({result:false});
    //     } else {
    //         res.status(200).json({result:true });
    //       }
    //     }
      
    // );
  // }

  //signin
  // const menemail = req.body.menemail;
  // const menpassword = req.body.menpassword;
  // if (!menemail && !menpassword) {
  //   db.collection("information")
  //     .aggregate([
  //       {
  //         $match: {
  //           $and: [{ email: empemail }, { password: emppassword }],
  //         },
  //       },
  //     ])
  //     .toArray(function (err, data) {
  //       if (err) {
  //         res.status(500).json({result:false});
  //       } else {
  //         if (data.length == 0) {
  //           res.status(200).json({result:false});
  //         } else {
  //           res.status(200).json({result:true ,raw:data});
  //         }
  //       }
  //     });
  // } 
  // else {
  
module.exports = router;


















// //emailsend
// router.get('/email',function(req,res){

//   "use strict";
// const nodemailer = require("nodemailer");


// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: ' <ramangupta5554@gmail.com>', // sender address
//     to: "ramangupta1636@gmail.com", // list of receivers
//     subject: "Mail Testing", // Subject line
//     html: "<b>Hello world</b>", // html body
//   });

//     if(info.messageId){
//       res.send("email send");
//     }
//     else{
//       res.send("Error with sending email");
//     }

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

// });










// router.post('/sendemail',(req,res) => {
//   upload(req,res,function(err){
//       if(err){
//           console.log(err)
//           return res.end("Something went wrong!");
//       }else{
//           to = req.body.to
//           subject = req.body.subject
//           body = req.body.body
//           path = req.file.path
//           console.log(to)
//           console.log(subject)
//           console.log(body)
//           console.log(req.path)
//           console.log(req.file)
//           var transporter = nodemailer.createTransport({
//               service: 'gmail',
//               auth: {
//                 user: 'ramangupta5554@gmail.com',
//                 pass: 'Guruji5554'
//               }
//             });
            
//             var mailOptions = {
//               from: 'ramangupta5554@gmail.com',
//               to: to,
//               subject:subject,
//               text:body,
//               attachments: [
//                 {
//                  path: path
//                 }
//              ]
//             };
            
//             transporter.sendMail(mailOptions, function(error, info){
//               if (error) {
//                 console.log(error);
//               } else {
//                 console.log('Email sent: ' + info.response);
//                 fs.unlink(path,function(err){
//                   if(err){
//                       return res.end(err)
//                   }else{
//                       console.log("deleted")
//                       return res.redirect('/result.html')
//                   }
//                 })
//               }
//             });
//       }
//   })
// })
