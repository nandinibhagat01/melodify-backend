const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();
router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);

router.get("/", authMiddleware.authUser, musicController.getAllMusics);

router.get("/:musicId", authMiddleware.authUser, musicController.getMusicById);
router.put("/:musicId", authMiddleware.authArtist, musicController.updateMusic);
router.delete("/:musicId", authMiddleware.authArtist, musicController.deleteMusic);

module.exports = router;
