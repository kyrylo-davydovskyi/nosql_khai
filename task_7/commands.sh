#!/bin/bash

IMPORT_FILE_NAME="restaurants-import.json"
EXPORT_FILE_NAME="restaurants-export.json"
DOWNLOAD_URL="https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/restaurants.json"
CONNECTION_STRING="mongodb+srv://<username>:<pwd>@<hostname>/"
COLLECTION_NAME="restaurants"

echo 'Downloading file...'
curl "$DOWNLOAD_URL" -o "$IMPORT_FILE_NAME";
echo 'Uploading file...'
mongoimport --uri "$CONNECTION_STRING" --collection "$COLLECTION_NAME" --drop --file "$IMPORT_FILE_NAME"
echo 'Exporting file...'
mongoexport --uri "$CONNECTION_STRING" --collection "$COLLECTION_NAME" --out "$EXPORT_FILE_NAME"