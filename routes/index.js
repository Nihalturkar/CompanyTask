var express = require('express');
var router = express.Router();
var userModel = require("./users")
var Task = require("./task")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function (req, res) {
  userModel.create({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  }).then(function (createduser) {
    res.send("user is created")
  })
});

router.get("/read",(req,res)=>{
    userModel.find().then(function(users){
      res.send(users)
    })
});

router.get('/taskassign', function (req, res) {
  userModel.find().then(function (allusers) { 
    res.render('taskassign', {allusers});
  })

})

router.post('/task', function (req, res) {

  Task.create({
    userid: req.body.user,
    taskname: req.body.taskname,
    tasktype: req.body.tasktype

  }).then(function (taskassigned) {

    userModel.findOne({ _id: req.body.user }).then(function (suser) {
      suser.taskid = taskassigned._id;
      suser.save().then(function (user) {
        res.send("task allotted")
      })
    })
  })
});

router.get("/show",function(req,res){
   Task.find().then(function(usertask){
res.send(usertask)
   })
});

router.get('/table', async function (req, res) {

  const data = await userModel.find({}).populate("taskid")
    res.render("table",{data})
  });
module.exports = router;
