
const express = require('express')

//라우팅
let router = express.Router();

router.get('/', async function(req,res){
    res.render('index', {});
});

module.exports = router;