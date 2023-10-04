
const express = require('express')
const { validationResult, body } = require('express-validator')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const Web3 = require("web3");
const jwt = require("jsonwebtoken");
const path = require('path');
const axios = require("axios");

require('dotenv').config({ path: path.join(__dirname, '.env') });

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

const checkJwt = () => {
    return (req,res,next) => {
        try{
            let req_jwt = req.headers.authrization //|| req.cookies.jwt
            req.user = jwt.verify(req_jwt, process.env.JWTSECRET)
            return next()
        }catch(error){
            if(error.name === 'TokenExpiredError'){
                return res.status(419).json({
                    code:419,
                    message:'expired token'
                })
            }
            return res.status(401).json({
                code: 401,
                message: `invalid token ${error.name}`
            })
        }
    }
}

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
        const jwt_token = jwt.sign(payload, process.env.JWTSECRET, option)
        // const cookieOptions = {
        //     // sameSite: "strict",
        //     sameSite: "none",
        //     httpOnly: true,
        //     secure: true,
        //     // domain: "http://localhost",
        //     // expires: new Date(Date.now() + parseInt(ENV.AUTH_EXPIREATION)),
        //     maxAge: 24 * 60 * 60 * 1000,
        //     path: "/",
        //   };
        // res.cookie('jwt', jwt_token, cookieOptions)

        return res.status(200).json({
            message:'jwt token issued',
            jwt_token,
        })
    }
)

app.post("/klipResult",
    body("request_key").isUUID(4),
    async function (req, res) {

        let request_key = req.body.request_key;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "invalid params", errors: errors.array() });
        }

        try {
            let resp = await axios({
                method: "get",
                url: `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`,
                headers: { "Content-Type": "application/json" }
            });

            let data = resp.data;
            if (data.status == "completed") {
                // make jwt with EOA
                let address = data.result.klaytn_address;
                const payload = { wallet: address };
                const option = {expiresIn:'7d', issuer:'server-auth'}
                const jwt_token = jwt.sign(payload, process.env.JWTSECRET, option);

                // let user = await db.users.getUser(db.game_db, address);
                // if (user == null)
                //     await db.users.createUser(db.game_db, address);
                // else
                //     await db.users.updateUserLoginAt(db.game_db, address);

                return res.json({
                    status: "completed",
                    message: 'jwt token issued',
                    jwt_token,
                    address
                });
            } else {
                return res.status(200).json(resp.data);
            }
        } catch (err) {
            if ("response" in err)
                return res.status(err.response.status).json(err.response.data)
            return res.status(400).json({ "message": "internal server error" });
        }

    })

const PORT = process.env.PORT
// let PORT = process.env.PORT || 3323;

app.listen(PORT, ()=>{
	console.log(`The Express server is listening at PORT: ${PORT}`)
})