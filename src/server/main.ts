import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { action } from './actions'
import { api } from './apis'
import { v4 as uuidv4 } from 'uuid';

const server = express()
const port = 5000

/* static file */
server.use(express.static(`${__dirname}/wwwroot`))

/* free permition api */
server.get(api.helloworld, (req, res) => {
    res.send(JSON.stringify("Hello World"))
})

/* cookie option */
server.use(cookieParser(uuidv4()))

/* session option */
server.use(session({
    secret: uuidv4(),
    name: "sess",
    cookie: { maxAge: 60 * 60 * 1000 }
}))

/* antiforgery middleware */
server.use((req, res, next)=>{
    if(!((req.session as any).antiforgeryToken))
        (req.session as any).antiforgeryToken = uuidv4();
    if(!req.cookies.antiforgeryToken || req.cookies.antiforgeryToken != (req.session as any).antiforgeryToken)
        res.cookie("antiforgeryToken", (req.session as any).antiforgeryToken)
    next();
})

/* form data decodeer */
server.use(express.urlencoded({ extended: true }));

/* acquire a session */
server.post(action.visit, (req, res)=>{
    res.sendStatus(200);
})

server.post(action.login, (req, res) => {
    console.log(req.header("content-type"))
    console.log(req.body)
    if((req.session as any).antiforgeryToken != req.body.antiforgeryToken){
        res.sendStatus(403)
    }
    res.sendStatus(200)
})

server.get('*', (req, res) => {
    res.sendFile(`${__dirname}/view/index.html`)
})

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})