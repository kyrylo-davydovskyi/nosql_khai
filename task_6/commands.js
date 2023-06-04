// Section 1. Working with index.
//find user by email
db.users.find({email: "palmerwanda@example.com"}, {_id:0}).explain("executionStats");

//create index by email
db.users.createIndex({ "email": 1 });

//find by regex and status isActive
db.users.find({ "name": { $regex: "Lisa" }, "isActive": true }).explain("executionStats");

//create index by name and status isActive
db.users.createIndex({ "name": 1, "isActive": 1 });

//Section 2.Working with text index.
//create text index by name
db.users.createIndex({ name: "text" });

//find by text index
db.users.find({ $text: { $search: "Lisa" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

//find by name Lisa or John
db.users.find({ $text: { $search: "Lisa John" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

//find by name John and Li but not Lisa
db.users.find({ $text: { $search: "John Li -Lisa" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

//find by phrase "john kelly", ignore case
db.users.find({ $text: { $search: "\"john kelly\"" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

//find by two words with "AND"
db.users.find({ $text: { $search: "Lisa AND John" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

//Section 3. 2d indexes
//create index by coordinates
db.locations.createIndex({ "coordinates": "2d" });

//example of usage $geoWithin
db.locations.find({ "coordinates": { $geoWithin: { $box: [[-75, 40], [-73, 42]] } } });
//example of usage $geoWithin with polygon
db.locations.find({ "coordinates": { $geoWithin: { $polygon: [[-118, 34], [-118, 35], [-117, 35], [-117, 34]] } } });
//example of usage $geoWithin with center
db.locations.find({ "coordinates": { $geoWithin: { $center: [[-0.1, 51.5], 0.2] } } });
//example of usage $near
db.locations.find({ "coordinates": { $near: [40, -74] } });


//Section 4. 2dsphere indexes
//create collections neighborhoods and restaurants
db.createCollection("neighborhoods")
db.createCollection("restaurants")
//create index by location
db.restaurants.createIndex({ "location": "2dsphere" });

//example of usage $geoWithin with polygon
var polygon = {
    type: "Polygon",
    coordinates: [
      [
        [-73.99, 40.73],
        [-73.97, 40.73],
        [-73.97, 40.75],
        [-73.99, 40.75],
        [-73.99, 40.73]
      ]
    ]
   };
   
   
db.restaurants.find({
location: {
   $geoWithin: {
       $geometry: polygon
   }
 }
});

//example of usage $near with point
var point = {
    type: "Point",
    coordinates: [-73.99, 40.73]
   };
   
   
db.restaurants.find({
 location: {
   $near: {
     $geometry: point
   }
 }
});

//example of usage $nearSphere with point
var point = {
    type: "Point",
    coordinates: [-73.99, 40.73]
   };
db.restaurants.find({
 location: {
   $nearSphere: {
     $geometry: point
   }
 }
});
   