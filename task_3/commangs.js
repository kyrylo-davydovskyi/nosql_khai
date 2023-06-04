db.songs.insertMany([  {"artist": "Rick Astley", "title": "Never Gonna Give You Up", "album": "Whenever You Need Somebody", "date": ISODate("1987-11-16"), "rating": 8.3, "metadata": {"bpm": 113, "mood": "upbeat", "musicians": ["Rick Astley"], "genres": ["pop"], "explicit": false}},
  {"artist": "AC/DC", "title": "Back in Black", "album": "Back in Black", "date": ISODate("1980-07-25"), "rating": 9.5, "metadata": {"bpm": 92, "mood": "energetic", "musicians": ["Brian Johnson", "Angus Young"], "genres": ["rock"], "explicit": false}},
  {"artist": "Guns N' Roses", "title": "Sweet Child O' Mine", "album": "Appetite for Destruction", "date": ISODate("1987-08-17"), "rating": 9.1, "metadata": {"bpm": 125, "mood": "sentimental", "musicians": ["Axl Rose", "Slash"], "genres": ["rock"], "explicit": false}},
  {"artist": "Led Zeppelin", "title": "Stairway to Heaven", "album": "Led Zeppelin IV", "date": ISODate("1971-11-08"), "rating": 9.7, "metadata": {"bpm": 63, "mood": "nostalgic", "musicians": ["Robert Plant", "Jimmy Page"], "genres": ["rock"], "explicit": false}},
  {"artist": "Metallica", "title": "Enter Sandman", "album": "Metallica", "date": ISODate("1991-07-29"), "rating": 9.0, "metadata": {"bpm": 123, "mood": "sinister", "musicians": ["James Hetfield", "Kirk Hammett"], "genres": ["metal"], "explicit": false}},
  {"artist": "The Beatles", "title": "Let It Be", "album": "Let It Be", "date": ISODate("1970-03-06"), "rating": 9.4, "metadata": {"bpm": 72, "mood": "hopeful", "musicians": ["Paul McCartney"], "genres": ["rock"], "explicit": false}},
  {"artist": "Radiohead", "title": "Paranoid Android", "album": "OK Computer", "date": ISODate("1997-06-16"), "rating": 9.1, "metadata": {"bpm": 73, "mood": "dark", "musicians": ["Thom Yorke", "Jonny Greenwood", "Ed O'Brien", "Colin Greenwood", "Philip Selway"], "genres": ["Alternative rock", "Art rock", "Experimental rock"], "explicit": false}},
  {"artist": "Guns N' Roses", "title": "Sweet Child O' Mine", "album": "Appetite for Destruction", "date": ISODate("1987-07-21"), "rating": 8.9, "metadata": {"bpm": 125, "mood": "nostalgic", "musicians": ["Axl Rose", "Slash", "Izzy Stradlin", "Duff McKagan", "Steven Adler"], "genres": ["Hard rock", "Heavy metal"], "explicit": false}},
  {"artist": "Led Zeppelin", "title": "Stairway to Heaven", "album": "Led Zeppelin IV", "date": ISODate("1971-11-08"), "rating": 9.5, "metadata": {"bpm": 63, "mood": "epic", "musicians": ["Jimmy Page", "Robert Plant", "John Paul Jones", "John Bonham"], "genres": ["Hard rock", "Folk rock", "Blues rock"], "explicit": false}},
  {"artist": "AC/DC", "title": "Highway to Hell", "album": "Highway to Hell", "date": ISODate("1979-07-27"), "rating": 8.7, "metadata": {"bpm": 114, "mood": "energetic", "musicians": ["Bon Scott", "Angus Young", "Malcolm Young", "Cliff Williams", "Phil Rudd"], "genres": ["Hard rock", "Heavy metal", "Blues rock"], "explicit": false}},
  {"artist": "The Who", "title": "Baba O'Riley", "album": "Who's Next", "date": ISODate("1971-08-14"), "rating": 8.8, "metadata": {"bpm": 130, "mood": "upbeat", "musicians": ["Roger Daltrey", "Pete Townshend", "John Entwistle", "Keith Moon"], "genres": ["Rock", "Hard rock", "Power pop"], "explicit": false}},
  {"artist": "Rage Against the Machine", "title": "Killing in the Name", "album": "Rage Against the Machine", "date": ISODate("1992-11-02"), "rating": 9.0, "metadata": {"bpm": 86, "mood": "angry", "musicians": ["Zack de la Rocha", "Tom Morello", "Tim Commerford", "Brad Wilk"], "genres": ["Rap metal", "Funk metal"], "explicit": true}}
]);

db.songs.find({artist:"Guns N' Roses"});

db.songs.deleteOne({artist:"Guns N' Roses"});


db.songs.find({artist:"Led Zeppelin"});

db.songs.deleteMany({artist:"Led Zeppelin"});

db.songs.find({title:"Smells Like Teen Spirit"});

db.songs.updateOne({ title: "Smells Like Teen Spirit" },{ $set: { rating: 9.2 } });

db.songs.find({title:"Bohemian Rhapsody"});

db.songs.updateOne({title:"Bohemian Rhapsody"}, {$set: {duration: 364}});

db.songs.find({title:"Never Gonna Give You Up"});

db.songs.updateOne({ artist: "Rick Astley", title: "Never Gonna Give You Up" },{ $set: { "metadata.mood": "nostalgic" } });

db.songs.updateMany(
   {},
   { $unset: { "metadata.explicit.required": "" } }
);


db.songs.find({title:"Never Gonna Give You Up"});

db.songs.updateOne({ "title": "Never Gonna Give You Up" }, { $unset: { "metadata.explicit": "" } })

db.songs.find({title:"Bohemian Rhapsody"});

db.songs.updateOne({ "title": "Bohemian Rhapsody" }, { $inc: { "rating": 0.1 } })


db.songs.find({ title: "Smells Like Teen Spirit" }, { "metadata.genres": 1, _id: 0 });

db.songs.updateOne({ "title": "Smells Like Teen Spirit" }, { $push: { "metadata.genres": "Rock" } });

db.songs.find({ title: "Wishmaster" }, { "metadata.musicians": 1, _id: 0 });

db.songs.updateOne({ "title": "Wishmaster" }, { $pop: { "metadata.musicians": -1 } })


db.songs.updateOne({ title: "Given Up" },{ $push: { "metadata.genres": { $each: ["Tiiiired", "Tiiiired"] } } });

db.songs.find({title: "Given Up" }, { "metadata.genres": 1, _id: 0 });

db.songs.updateOne({ "title": "Given Up"}, { $pull: { "metadata.genres": "Tiiiired" } });


db.songs.find({artist:"Rammstein"});

db.songs.replaceOne( { artist: "Rammstein" }, { title: "Deutschland", artist: "Rammstein", album: "Rammstein", rating: 8.4, date: ISODate("2019-07-29"), metadata: {"bpm": 125, "mood": "nostalgic", "musicians": ["Axl Rose", "Slash", "Izzy Stradlin", "Duff McKagan", "Steven Adler"], "genres": ["Hard rock", "Heavy metal"], "explicit": false}, mood: ["Dark", "Energetic"] } );
