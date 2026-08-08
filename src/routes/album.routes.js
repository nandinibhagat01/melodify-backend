const authMiddleware = require("../middlewares/auth.middleware");
const albumController = require("../controllers/album.controller");
const express = require("express");

const router = express.Router();

router.post("/albums", authMiddleware.authArtist, albumController.createAlbum);

router.get("/", authMiddleware.authUser, albumController.getAllAlbums);

router.get(
  "/:albumId",
  authMiddleware.authUser,
  albumController.getAlbumById,
);

module.exports = router;
