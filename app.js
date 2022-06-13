"use strict";

/** Express app for Melody Glow. */

const express = require("express");

const { NotFoundError } = require("./expressError");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const genresRoutes = require("./routes/genres");
const songsRoutes = require("./routes/songs");
const playlistsRoutes = require("./routes/playlists");

const app = express();

app.use(express.json());
app.use(authenticateJWT);

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/songs", songsRoutes);
app.use("/genres", genresRoutes);
app.use("/playlists", playlistsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
