db.createCollection("users", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password", "dateOfBirth", "address"],
          properties: {
             name: {
                bsonType: "string",
                description: "Name must be a string"
             },
             email: {
                bsonType: "string",
                description: "Email must be a string"
             },
             password: {
                bsonType: "string",
                description: "Password must be a string"
             },
             dateOfBirth: {
                bsonType: "date",
                description: "Date of birth must be a date"
             },
             address: {
                bsonType: "string",
                description: "Address must be a string"
             },
             phone: {
                bsonType: "string",
                description: "Phone must be a string"
             },
             isActive: {
                bsonType: "bool",
                description: "isActive must be a boolean"
             }
          }
       }
    },
    validationLevel: "strict",
    validationAction: "error"
  });
  