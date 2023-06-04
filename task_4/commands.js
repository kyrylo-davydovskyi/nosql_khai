db.songs.count();
db.songs.countDocuments();
db.songs.countDocuments({ "artist": "Queen" });
db.songs.distinct("artist");
db.songs.aggregate([{ $group: { _id: null, totalDuration: { $sum: "$duration" } } }]);
db.songs.aggregate([{ $group: { _id: null, averageRating: { $avg: "$rating" } } }]);
db.songs.aggregate([{ $group: { _id: null, minRating: { $min: "$rating" } } }]);
db.songs.aggregate([{ $group: { _id: null, maxRating: { $max: "$rating" } } }]);
db.songs.aggregate([{ $group: { _id: null, firstTitle: { $first: "$title" } } }]);
db.songs.aggregate([{ $group: { _id: null, lastTitle: { $last: "$title" } } }]);
db.songs.aggregate([{ $group: { _id: "$artist", songs: { $push: "$title" } } }]);
db.songs.aggregate([{ $group: { _id: "$artist", uniqueAlbums: { $addToSet: "$album" } } }]);
db.songs.aggregate([{ $group: { _id: "$artist", totalRating: { $sum: "$rating" }, averageDuration: { $avg: "$duration" } } }]);
db.songs.aggregate([{ $group: { _id: "$artist", totalRating: { $avg: "$rating" }, averageDuration: { $avg: "$duration" } } }]);
db.songs.aggregate([{ $group: { _id: "$artist", totalRating: { $avg: "$rating" } } }, { $sort: { totalRating: -1 } }]);
db.songs.aggregate([{ $group: { _id: { artist: "$artist", date: "$date" }, count: { $sum: 1 } } }]);
db.songs.aggregate([{ $unwind: "$artist" }, { $group: { _id: "$artist", count: { $avg: "$rating" } } }]);