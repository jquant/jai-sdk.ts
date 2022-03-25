
# JAI Javascript SDK

### Our Docs
https://jai-sdk.readthedocs.io/en/latest/

### Our REST API
https://documenter.getpostman.com/view/11432617/UVJcmxB1#0053601f-0014-4754-b917-347783ec4866

# CLI (Command Line Interface)

## Getting Started

```bash
npm i jai-sdk-ts
```

## Getting your auth Key

npx jai-sdk-ts get-auth-key \
    --first-name "YOUR_FIRST_NAME" \
    --last-name "YOUR_LAST_NAME" \
    --email "YOUR_BEST_EMAIL_HERE" \
    [--company-name "YOUR_COMPANY_NAME_HERE"]

## Collection Management

### Insert Data

```bash
npx jai-sdk-ts insert-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --data "$(cat ./data-file-body.json)" \
   [--filter-name | -f] 'your filter here' \
   [--verbose | -v] \
    --key YOUR_JAI_API_KEY 
```

## Check Inserted Data

```bash
npx jai-sdk check-inserted-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [--mode | -m] complete | summarized | simple \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Setup Inserted Data

```bash
npx jai-sdk setup-inserted-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --settings "$(cat ./your-settings-file.json)" \
    [--quick-test | t] [true | false] \
    [--overwrite | o] [true | false] \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Interrupt Data Setup

```bash
npx jai-sdk interrupt-data-setup \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --key YOUR_JAI_API_KEY
```

## Delete Raw Inserted Data

```bash
npx jai-sdk delete-inserted-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --key YOUR_JAI_API_KEY
```

## Get Filters

```bash
npx jai-sdk get-filters \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --key YOUR_JAI_API_KEY
```

## Add Data Patch

```bash
npx jai-sdk add-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [callback-url | -u] 'http://my-calback-url.com' \
    [-v] \
    --key YOUR_JAI_API_KEY
```

## Get Database Description

```bash
npx jai-sdk get-database-description\
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [-v] \
    --key YOUR_JAI_API_KEY
```

## Get Database Info

```bash
npx jai-sdk get-database-info \
    [--mode | -m] [complete | complete | names] \
    [-v] \
    --key YOUR_JAI_API_KEY
```

## Get Ids

```bash
npx jai-sdk get-ids \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [--mode | -m] complete | summarized | simple \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Get Ids

```bash
npx jai-sdk get-report \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Get Vector By Id

```bash
npx jai-sdk get-vector-by-id \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --arrayOfIds IDS_COMMA_SEPARETED \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Get Download Key (Url to Download Vector)

```bash
npx jai-sdk get-download-key \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --key YOUR_JAI_API_KEY
```

## Get Fields

```bash
npx jai-sdk get-fields \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Is Database Name Valid

```bash
npx jai-sdk is-database-name-valid \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Get Status

```bash
npx jai-sdk get-status \
    --key YOUR_JAI_API_KEY
```

## Delete Status

```bash
npx jai-sdk delete-status \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --key YOUR_JAI_API_KEY
```

## Delete Entity (Vectors) By Id

```bash
npx jai-sdk delete-entity \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --arrayOfIds IDS_COMMA_SEPARETED \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

## Delete Database

```bash
npx jai-sdk delete-database \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```



## Similarity Methods

### Search By ID

```bash
npx jai-sdk-ts similarity-search-by-id \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --arrayOfIds IDS_COMMA_SEPARETED \
   [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

### Search By Data

```bash
npx jai-sdk-ts similarity-search-by-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --data "$(cat ./data-file-body.json)" \
   [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

#### data-file-body.json content

```bash
[{
  "id": 0,
  "sepal length (cm)": 0.1,
  "sepal width (cm)": 1.2,
  "petal length (cm)": 0.3,
  "petal width (cm)": 2.4
}]
```

## Prediction

```bash
npx jai-sdk-testing predict \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --data "$(cat ./data-file-body.json)" \
    [--predict-probability | -p] true \
   [--verbose | -v] \
    --key YOUR_JAI_API_KEY
```

# NodeJS / Javascript Implementation

```code

const express = require('express')
const app = express()

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
    ...
} = require('jai-sdk-testing');

if (process.env.JAI_API_KEY) {
    authenticateFromEnvironmentVariable()
    console.debug(authMessage());
}

app.get('/get-status', (req, res) => {
    getStatus().then(data => {
        res.send(data);
    })
})

...

```
