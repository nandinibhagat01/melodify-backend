const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  const { title, details } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    details,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      details: music.details,
      artist: music.artist,
    },
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel.find().limit(10);

  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  });
}

async function getMusicById(req, res) {
  const musicId = req.params.musicId;
  const music = await musicModel.findById(musicId);
  res.status(200).json({
    message: "Music fetched successfully",
    music: music,
  });
}

async function updateMusic(req, res) {
  const musicId = req.params.musicId;
  const { title, details } = req.body;
  const music = await musicModel.findById(musicId);

  if (!music) {
    return res.status(404).json({
      message: "Music not found",
    });
  }

  if (music.artist.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You are not authorised to upadate this music",
    });
  }
  music.title = title;
  music.details = details;

  await music.save();

  res.status(200).json({
    message: "Music updated successfully",
    music,
  });
}

async function deleteMusic(req, res) {
  const musicId = req.params.musicId;
  const music = await musicModel.findById(musicId);

  if (!music) {
    return res.status(404).json({
      message: "Music not found",
    });
  }

  if (music.artist.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You are not authorized to delete this music",
    });
  }

  await musicModel.findByIdAndDelete(musicId);

  await albumModel.updateMany(
    { musics: musicId },
    { $pull: { musics: musicId } },
  );

  return res.status(200).json({
    message: "Music Deleted",
  });
}

module.exports = {
  createMusic,
  getAllMusics,
  getMusicById,
  updateMusic,
  deleteMusic,
};
