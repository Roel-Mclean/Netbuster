const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const multer = require('multer');
const upload = multer();

let routes = app => {

  router.get("/", homeController.getHome);

  const cpUpload = upload.fields([{ name: 'file', maxCount: 5 }, { name: 'title', maxCount: 1 }, { name: 'description', maxCount: 1 }, { name: 'rating', maxCount: 1 }, { name: 'trailerURL', maxCount: 1 }, { name: 'price', maxCount: 1 }])
  router.post("/upload", cpUpload, uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;