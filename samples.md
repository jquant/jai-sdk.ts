node dist/esbuild/cli.js similarity-search-by-id \
    --collectionName cc_fraud_supervised \
    --arrayOfIds 5,2 \
    --key d1cd1f0c532544699088cf4fad8e3222

node dist/esbuild/cli.js similarity-search-by-data \
    --collectionName iris_supervised \
    --data "$(cat ./doc/samples/similarity-by-data-body.json)" \
    --key d1cd1f0c532544699088cf4fad8e3222
