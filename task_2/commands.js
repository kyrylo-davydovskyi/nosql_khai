
db.songs.insertMany([
    { artist: "Queen", title: "Bohemian Rhapsody", album: "", date: ISODate("1975-10-31"), rating: 9.5, metadata: { bpm: 143, mood: "Energetic", musicians: ["Freddie Mercury", "Brian May", "John Deacon", "Roger Taylor"], genres: ["Rock", "Progressive Rock"], explicit: false } },
    { artist: "Nirvana", title: "Smells Like Teen Spirit", album: "Nevermind", date: ISODate("1991-09-10"), rating: 8.7, metadata: { bpm: 116, mood: "Rebellious", musicians: ["Kurt Cobain", "Dave Grohl", "Krist Novoselic"], genres: ["Grunge", "Alternative Rock"], explicit: false } },
    { artist: "Eminem", title: "Rap God", album: "The Marshall Mathers LP 2", date: ISODate("2013-10-14"), rating: 7.8, metadata: { bpm: 148, mood: "Confident", musicians: ["Eminem"], genres: ["Hip Hop", "Rap"], explicit: true } },
    { artist: "Sabaton", title: "Wermacht", album: "Primo Victoria", date: ISODate("2005-03-04"), rating: 8.3, metadata: { bpm: 127, mood: "Patriotic", musicians: ["Joakim Brodén", "Pär Sundström", "Chris Rörland", "Hannes Van Dahl", "Tommy Johansson"], genres: ["Power Metal"], explicit: false } },
    { artist: "Rammstein", title: "Du Hast", album: "Sehnsucht", date: ISODate("1997-07-28"), rating: 8.1, metadata: { bpm: 138, mood: "Aggressive", musicians: ["Till Lindemann", "Richard Z. Kruspe", "Oliver Riedel", "Paul Landers", "Christoph Schneider", "Christian Lorenz"], genres: ["Industrial Metal"], explicit: false } },
    { artist: "MCR", title: "I'm Not Okay", album: "Three Cheers for Sweet Revenge", date: ISODate("2004-09-28"), rating: 7.6, metadata: { bpm: 82, mood: "Angsty", musicians: ["Gerard Way", "Mikey Way", "Frank Iero", "Ray Toro"], genres: ["Emo", "Pop Punk"], explicit: false } },
    { artist: "Three Days Grace", title: "Animal", album: "Life Starts Now", date: ISODate("2009-09-22"), rating: 7.4, metadata: { bpm: 168, mood: "Energetic", musicians: ["Adam Gontier", "Neil Sanderson", "Brad Walst"], genres: ["Alternative Rock", "Post-Grunge"], explicit: false } },
    { artist: "Linkin Park", title: "Given Up", album: "Minutes to Midnight", date: ISODate("2007-02-17"), rating: 8.2, metadata: { bpm: 174, mood: "Angry", musicians: ["Chester Bennington", "Mike Shinoda", "Brad Delson", "Dave \"Phoenix\" Farrell", "Rob Bourdon", "Joe Hahn"], genres: ["Alternative Metal", "Nu Metal"], explicit: false } },
    { artist: "Nightwish", title: "Wishmaster", album: "Wishmaster", date: ISODate("2000-05-08"), rating: 8.5, metadata: { bpm: 86, mood: "Epic", musicians: ["Tarja Turunen", "Emppu Vuorinen", "Tuomas Holopainen", "Sami Vänskä", "Jukka Nevalainen"], genres: ["Symphonic Metal"], explicit: false } },
    { artist: "ABBA", title: "Money Money Money", album: "Arrival", date: ISODate("1976-11-01"), rating: 7.2, metadata: { bpm: 142, mood: "Upbeat", musicians: ["Agnetha Fältskog", "Benny Andersson", "Björn Ulvaeus", "Anni-Frid Lyngstad"], genres: ["Pop"], explicit: false } }
  ])
  
  db.songs.find({ rating: { $gte: 8 } });
  
  
  db.songs.find({});
  
  db.songs.find({ rating: { $gte: 8 } });
  
  db.songs.find({ "metadata.explicit": true });
  
  db.songs.find({ album: { $exists: false } });
  
  db.songs.find({ album: { $in: ["", null] } });
  
  db.songs.find({ "metadata.musicians": "Freddie Mercury" });
  
  db.songs.find({
    $and: [
      { artist: "Queen" },
      { "metadata.bpm": { $gte: 120 } }
    ]
  });
  
  db.songs.find({$or: [{ artist: "Nirvana" },{ artist: "Sabaton" }]});
  
  
  db.songs.find({artist: {$not: {$in: ["Queen", "Nirvana"]}}});
  
  db.songs.find({$nor: [{ artist: "Queen" },{ "metadata.bpm": { $lt: 100 } }]})
  
  // > 120
  db.songs.find({ "metadata.bpm": { $gt: 120 } });
  // >= 120
  db.songs.find({ "metadata.bpm": { $gte: 120 } });
  // < 120
  db.songs.find({ "metadata.bpm": { $lt: 120 } });
  // <= 120
  db.songs.find({ "metadata.bpm": { $lte: 120 } });
  // != 120
  db.songs.find({ "metadata.bpm": { $ne: 120 } });
  
  
  db.songs.find({ "metadata.genres": { $regex: /rock/i } });
  db.songs.find();
  
  db.songs.find({ "metadata.genres": "Rock" });
  db.songs.find({ "metadata.genres": { $in: ["Rock", "Power Metal"] } });
  db.songs.find({ "metadata.musicians": { $all: ["Freddie Mercury", "Brian May"] } });
  db.songs.find({ "metadata.musicians": { $size: 4 } });