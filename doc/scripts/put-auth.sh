
curl --location --request PUT 'https://mycelia.azure-api.net/auth' \
  --header 'Content-Type: application/json' \
  --header "Auth: $JAI_SDK_KEY" \
  --data-raw '{
    "email": "felipe@bestserviceit.com.br",
    "firstName": "Felipe",
    "lastName": "Esteves",
    "company": "JAI #2",
  }'
