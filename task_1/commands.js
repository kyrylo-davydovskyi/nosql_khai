db.createCollection("songs", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "title", "artist", "year", "genre", "duration", "rating", "musicians" ],
          properties: {
             title: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             artist: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             year: {
                bsonType: "int",
                minimum: 1900,
                maximum: 2023,
                description: "must be an integer in the range 1900-2023 and is required"
             },
             genre: {
                bsonType: "string",
                enum: ["rock", "pop", "hip-hop", "jazz", "blues", "country"],
                description: "must be a string with one of the enum values and is required"
             },
             duration: {
                bsonType: "int",
                minimum: 1,
                description: "must be an integer greater than or equal to 1 and is required"
             },
             rating: {
                bsonType: "double",
                minimum: 0,
                maximum: 10,
                description: "must be a double in the range 0-10 and is required"
             },
             musicians: {
                bsonType: "array",
                items: {
                   bsonType: "string"
                },
                description: "must be an array of strings and is required"
             }
          }
       }
    }
 })
 
 
 db.songs.insertMany([
   {
     title: "Bohemian Rhapsody",
     artist: "Queen",
     year: 1975,
     genre: "rock",
     duration: 355,
     rating: 4.8,
     musicians: ["Freddie Mercury", "Brian May", "John Deacon", "Roger Taylor"]
   },
   {
     title: "Smells Like Teen Spirit",
     artist: "Nirvana",
     year: 1991,
     genre: "rock",
     duration: 301,
     rating: 4.6,
     musicians: ["Kurt Cobain", "Krist Novoselic", "Dave Grohl"]
   }
 ]);
 
 db.songs.find({genre: "hip-hop"});
 
 
 db.songs.insertOne({
     title: "Rap God",
     artist: "Eminem",
     year: 2013,
     genre: "hip-hop",
     duration: 363,
     rating: 4.8,
     musicians: ["Eminem"]
 })
 
 db.songs.insertOne({
     title: "Wermacht",
     artist: "Sabaton",
     year: 2010,
     genre: "rock",
     duration: 228,
     rating: 4.5,
     musicians: ["Joakim Brodén", "Pär Sundström", "Tobias Alkman", "Hannes Van Dahl", "Chris Rörland", "Tommy Johansson"]
 })
 
 db.songs.insertOne({
     title: "Du Hast",
     artist: "Rammstein",
     year: 1997,
     genre: "rock",
     duration: 237,
     rating: 4.7,
     musicians: ["Till Lindemann", "Richard Z. Kruspe", "Paul H. Landers", "Oliver Riedel", "Christoph Schneider", "Christian Lorenz"]
 })
 
 db.songs.insertMany([
   {
     title: "I'm Not Okay",
     artist: "MCR",
     year: 2004,
     genre: "rock",
     duration: 192,
     rating: 4.5,
     musicians: ["Gerard Way", "Ray Toro", "Mikey Way", "Frank Iero"]
   },
   {
     title: "Animal",
     artist: "Three Days Grace",
     year: 2009,
     genre: "rock",
     duration: 186,
     rating: 4.2,
     musicians: ["Adam Gontier", "Neil Sanderson", "Brad Walst"]
   },
   {
     title: "Given Up",
     artist: "Linkin Park",
     year: 2007,
     genre: "rock",
     duration: 197,
     rating: 4.7,
     musicians: ["Chester Bennington", "Mike Shinoda", "Brad Delson", "Rob Bourdon", "Dave Farrell", "Joe Hahn"]
   }
 ])
 
 db.songs.insertOne({
   title: "Wishmaster",
   artist: "Nightwish",
   year: 2000,
   genre: "rock",
   duration: 247,
   rating: 4.5,
   musicians: ["Tarja Turunen", "Emppu Vuorinen", "Jukka Nevalainen", "Marco Hietala", "Tuomas Holopainen"]
 })
 
 db.songs.insertOne({
   title: "Money Money Money",
   artist: "ABBA",
   year: 1976,
   genre: "pop",
   duration: 198,
   rating: 4.2,
   musicians: ["Agnetha Fältskog", "Björn Ulvaeus", "Benny Andersson", "Anni-Frid Lyngstad"]
 })
 
 //filter
 db.songs.find({artist: "Queen"});
 //filter where no
 db.songs.find({musicians: {$nin: ["Eminem"]}});
 
 db.songs.find();
 
 db.songs.updateOne({ title: "Bohemian Rhapsody" }, { $set: { metadata: { BPM: 72, Mood: "Epic", Language: "English", Album: "A Night at the Opera" } } })
 
 db.songs.updateOne({ title: "Smells Like Teen Spirit" }, { $set: { metadata: { BPM: 116, Mood: "Rebellious", Language: "English", Album: "Nevermind" } } })
 
 db.songs.updateOne({ title: "Rap God" }, { $set: { metadata: { BPM: 148, Mood: "Energetic", Language: "English", Album: "The Marshall Mathers LP2" } } })
 
 db.songs.updateOne({ title: "Wermacht" }, { $set: { metadata: { BPM: 127, Mood: "Patriotic", Language: "English", Album: "The Art of War" } } })
 
 db.songs.updateOne({ title: "Du Hast" }, { $set: { metadata: { BPM: 120, Mood: "Aggressive", Language: "German", Album: "Sehnsucht" } } })
 
 db.songs.updateOne({ title: "I'm Not Okay" }, { $set: { metadata: { BPM: 93, Mood: "Angsty", Language: "English", Album: "Three Cheers for Sweet Revenge" } } })
 
 db.songs.updateOne({ title: "Animal" }, { $set: { metadata: { BPM: 160, Mood: "Energetic", Language: "English", Album: "Life Starts Now" } } })
 
 db.songs.updateOne({ title: "Given Up" }, { $set: { metadata: { BPM: 170, Mood: "Angry", Language: "English", Album: "Minutes to Midnight" } } })
 
 db.songs.updateOne({ title: "Wishmaster" }, { $set: { metadata: { BPM: 150, Mood: "Epic", Language: "English", Album: "Wishmaster" } } })
 
 db.songs.updateOne({ title: "Money Money Money" }, { $set: { metadata: { BPM: 134, Mood: "Upbeat", Language: "English", Album: "Arrival" } } })
 