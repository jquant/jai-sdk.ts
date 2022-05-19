const express = require('express')
const app = express()

app.use(express.json())

require('dotenv').config()

const {
    getStatus,
    authenticate,
    authenticateFromEnvironmentVariable,
    insertData,
    getFields,
    isDatabaseNameValid,
    checkInsertedData,
    addData,
} = require('jai-sdk');

const { JAI_API_KEY } = process.env;

const authMessage = () => {

    const start = JAI_API_KEY.toString().substring(0, 4);
    const end = JAI_API_KEY.toString().substring(28);

    `JAI authenticated with env ${start}**************************${end}`;
}

if (JAI_API_KEY) {
    authenticateFromEnvironmentVariable()
    console.debug(authMessage());
}

app.get('/authenticate/:key', (req, res) => {
    authenticate(req.params.key);
    res.send('Authenticated Successfuly!');
})

app.get('/get-status', (req, res) => {
    getStatus().then(data => {
        res.send(data);
    })
})

app.post('/insert-data', async (req, res) => {

    try {
        const data = await insertData(req.body.databaseName, req.body.filterName, req.body.data);

        res.status(200).send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

app.post('/add-data', async (req, res) => {

    try {
        const data = await addData(req.body.databaseName, req.body.filterName, req.body.data);

        res.status(200).send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

app.get('/get-fields/:databaseName', async (req, res) => {

    try {
        const data = await getFields(req.params.databaseName);

        res.status(200)
            .send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

app.get('/is-database-name-valid/:databaseName', async (req, res) => {

    try {
        const data = await isDatabaseNameValid(req.params.databaseName);

        res.status(200)
            .send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

app.get('/check-inserted-data/:databaseName/:mode', async (req, res) => {

    try {
        const data = await checkInsertedData(req.params.databaseName, req.params.mode);

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
