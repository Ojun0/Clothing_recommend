var express = require('express');
var router = express.Router();
const pool = require('../db/db');
const { request } = require('../app');

router.get('/', async (req, res) => {
    res.render('home')
})

// router.post('/', async (req, res) => {
//     res.redirect('recommendWear')
// })

res = request.post(
    url= 'https://api.kr.omnicommerce.ai/2022-08/management/products',
    json={
        "option":["BLOCK_DUPLICATES"],
        "products" : [
            {
                "id":"" ,
                "url": "",
                "salesUrl": "",
                "detectoin":"PANTS"
            }
        ]
    }
)
module.exports = router;
