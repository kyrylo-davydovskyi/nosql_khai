curl https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/restaurants.json -o restaurants.json;
curl https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/neighborhoods.json -o neighborhoods.json;
mongoimport --db test --collection neighborhoods --file neighborhoods.json --maintainInsertionOrder;
mongoimport --db test --collection restaurants --file restaurants.json --maintainInsertionOrder;
mongoexport --db test --collection users --out users_dump.json;