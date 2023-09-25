const express = require('express')
const { validationResult, body } = require('express-validator')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const Web3 = require("web3");
const jwt = require("jsonwebtoken");

app.use(cors())
app.use(cookieParser());

// 라우팅
// app.use('/',(req,res)=>{
// 	res.send('hello, world!')
// })
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//라우팅 + get,post 메소드
app.get('/',(req,res)=>{
	res.send('GET')
})

app.post('/auth',
    body("address").isEthereumAddress(),
    body("signature").exists(),
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({message: 'invalid params', errors:errors.array()})
    
        // const message = config.server.SIGN_MESSAGE
        const message = 'dapp-sign'
        const address = req.body.address
        const signature = req.body.signature

        let hash = Web3.utils.soliditySha3(message, address)
        const recovered = Web3.eth.accounts.recover(hash, signature)

        if(address.toLowerCase() !== recovered.toLowerCase()){
            res.status(500).json({message:'recovered address is not matched'})
        }

        const payload = {wallet:recovered}
        const option = {expiresIn:'7d', issuer:'server-auth'}
        const JWTSECRET = 'jwtblabla1234!blablajwt'
        const jwt_token = jwt.sign(payload, JWTSECRET, option)

        return res.status(200).json({
            message:'jwt token issued',
            jwt_token,
        })
    }
)

const PORT = 500
app.listen(PORT, ()=>{
	console.log(`The Express server is listening at PORT: ${PORT}`)
})