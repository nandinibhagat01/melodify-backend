const albumModel = require("../models/album.model");

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");
  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");

  return res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
}

async function addMusicToAlbum(req, res) {
  const albumId = req.params.albumId;
  const { musics } = req.body;
  const album = await albumModel.findById(albumId);

  if (!album) {
    return res.status(404).json({
      message: "Album not found",
    });
  }
  album.musics.push(...musics);

  res.status(200).json({
    message: "Music added to album successfully",
    album,
  });
}

module.exports = { createAlbum, getAllAlbums, getAlbumById, addMusicToAlbum };
