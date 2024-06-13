var express = require('express');
var router = express.Router();
const pool = require('../db/db');
let tinyColor = require("../public/js/tinyColor");

router.get('/', async (req, res) => {

    res.render('recommendWear')
});

// router.post("/color" ,async(req, res,next) => {
//     const {inputColor} = req.body;
//     let color = tinyColor.colorToHex(inputColor);
//     console.log(color);

//     res.render("recommendWearResult", {color: color});
// })

module.exports = router;
