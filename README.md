
# JAI Javascript SDK

### Our Docs
https://jai-sdk.readthedocs.io/en/latest/

### Our REST API
https://documenter.getpostman.com/view/11432617/UVJcmxB1#0053601f-0014-4754-b917-347783ec4866

## Getting Started

```bash
npm i jai-sdk-ts
```

## Collection Management

### Insert Data

npx jai-sdk-ts  insert-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --data "$(cat ./data-file-body.json)" \
   [--filter-name | -f] 'your filter here' \
   [--verbose | -v] \
    --key YOUR_JAY_API_KEY 

## Similarity Methods

### Search By ID

```bash
npx jai-sdk-ts similarity-search-by-id \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --arrayOfIds IDS_COMMA_SEPARETED \
   [--verbose | -v] \
    --key YOUR_JAY_API_KEY
```

### Search By Data

```bash
npx jai-sdk-ts similarity-search-by-data \
    --databaseName YOUR_COLLECTION_NAME_HERE \
    --data "$(cat ./data-file-body.json)" \
   [--verbose | -v] \
    --key YOUR_JAY_API_KEY
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
    --key YOUR_JAY_API_KEY
```
