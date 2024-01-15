var express = require('express');
var router = express.Router();
var con = require('./connection');
const cors = require('cors');
const upload = require("./multer");

router.use(cors());
router.use(express.json());

router.get('/', function(req, res, next) {
  res.json({ data: 'respond with a resource', message: 'success', success: true });
});

router.get("/get", function (req, res) {
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
//signup
router.post("/signup", function (req, res) {

  console.log(req.body , "body");
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  console.log("🚀 ~ sql:", sql)

  con.query(sql, [name, email, password], function (err, result) {
    if (err) {
      console.log('sunil')
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    res.status(200).json({ message: 'User successfully registered', success: true });
  });
});

//login
router.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body , "body")
  var sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  console.log("🚀 ~ sql:", sql)
  con.query(sql, [email, password], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ message: 'Invalid credentials', success: false  });
      return;
    }

    console.log(result)

    res.status(200).json({ message: 'User successfully logged in', success: true,data:{
      userId : result[0].userId,
    } });
  });
}
);

//add Properties 
//Property table includes, name, location,price, bedrooms, bathrooms, squareArea, date, type, yearBuilt, city
router.post("/addProperty", function (req, res) {
  var userId = req.body.userId;
  var name = req.body.name;
  var location = req.body.location;
  var price = req.body.price;
  var bedrooms = req.body.bedrooms;
  var bathrooms = req.body.bathrooms;
  var squareArea = req.body.squareArea;
  var date = req.body.date;
  var type = req.body.type;
  var yearBuilt = req.body.yearBuilt;
  var city = req.body.city;
  var sql = "INSERT INTO property (name, location, price, bedrooms, bathrooms, squareArea, date, type, yearBuilt, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  console.log("🚀 ~ sql:", sql)
  con.query(sql, [name, location, price, bedrooms, bathrooms, squareArea, date, type, yearBuilt, city], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    res.status(200).json({ message: 'Property successfully added', success: true });
  });
}
);


module.exports = router;