const jai = require('jai-sdk-testing');

const { GetStatus, Authenticate } = jai;

const express = require('express')
const app = express()
const port = 3000


app.get('/authenticate/:key', (req, res) => {
    Authenticate(req.params.key);
    res.send('Authenticated Successfuly!');
})

app.get('/get-status/:key', (req, res) => {

    Authenticate(req.params.key);

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


