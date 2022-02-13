const express = require('express')
const app = express()

app.use(express.json())

require('dotenv').config()

const jai = require('jai-sdk-testing');

const {
    GetStatus,
    Authenticate,
    AuthenticateFromEnvironmentVariable,
    InsertData,
    GetFields,
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

app.post('/insert-data', async (req, res) => {

    try {
        const data = await InsertData(req.body.databaseName, req.body.filterName, req.body.data);

        res.status(200).send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

app.get('/get-fields/:databaseName', async (req, res) => {

    try {
        const data = await GetFields(req.params.databaseName);

        res.status(200)
            .send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

app.get('/', (req, res) => {
    res.send(authMessage());
})

module.exports = app;