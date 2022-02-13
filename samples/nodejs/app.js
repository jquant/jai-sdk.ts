
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

require('dotenv').config()

const jai = require('jai-sdk-testing');

const {
    GetStatus,
    Authenticate,
    AuthenticateFromEnvironmentVariable,
    InsertData,
} = jai;

const authMessage = () => `JAI authenticated with env ${process.env.JAI_API_KEY.toString().substring(0, 4)}**************************${process.env.JAI_API_KEY.toString().substring(28)}`;

if (process.env.JAI_API_KEY) {
    AuthenticateFromEnvironmentVariable()
    console.debug(authMessage());
}

app.get('/authenticate/:key', (req, res) => {
    Authenticate(req.params.key);
    res.send('Authenticated Successfuly!');
})

app.get('/get-status', (req, res) => {
    GetStatus().then(data => {
        res.send(data);
    })
})

app.post('/insert-data', (req, res) => {
    InsertData(req.body.databaseName, req.body.filterName, req.body.data).then(data => {
        res.send(data);
    })
})

app.get('/', (req, res) => {
    res.send(authMessage());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


