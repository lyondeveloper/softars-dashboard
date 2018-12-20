// require("./config");
// const connection = require("../server").connection;
// const mongoose = require("mongoose");
// const crypto = require("crypto");
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// const path = require("path");

// //Init gfs
// let gfs;

// //Init stream

// connection.once("open", () => {
//   gfs = Grid(connection.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// //Creating storage engine

// const storage = new GridFsStorage({
//   url: process.env.MONGOURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) return reject(err);

//         const filename = buf.toString("hex") + path.extname(file.originalname);

//         const fileInfo = {
//           filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// module.exports = {
//   upload,
//   gfs
// };
