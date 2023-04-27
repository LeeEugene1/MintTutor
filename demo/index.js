const cors = require('cors')
const express = require('express')
const app = express()
let router = express.Router();
app.use("/", router)
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static('public'));
router.use("/", require("./router/common.js"));

router.get('/', async function(req,res){
    res.render('index', {});
});

const PORT = 500
app.listen(PORT, ()=>{
	console.log(`The Express server is listening at PORT: ${PORT}`)
})