
const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

const jai = require('jai-sdk-testing');

const {
    GetStatus,
    Authenticate,
    AuthenticateFromEnvironmentVariable,
} = jai;

if (process.env.JAI_API_KEY) {
    AuthenticateFromEnvironmentVariable()
    console.log(`JAI authenticated with env ${process.env.JAI_API_KEY.toString().substring(0, 4)}**************************${process.env.JAI_API_KEY.toString().substring(28)}`);
}

app.get('/get-status', (req, res) => {
    GetStatus().then(data => {
        res.send(data);
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


