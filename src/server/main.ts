import express from 'express'

const server = express()
const port = 5000
const route = {
    api:{
        helloworld: "/api/helloworld"
    },
}

server.use(express.static(`${__dirname}/wwwroot`))

console.log(route.api.helloworld)
server.get(route.api.helloworld, (req, res)=>{
    res.send(JSON.stringify("Hello World"))
})
server.get('*', (req, res)=>{
    res.sendFile(`${__dirname}/wwwroot/index.html`)
})

server.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})