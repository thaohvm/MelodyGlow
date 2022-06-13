DROP TABLE  if exists users;
DROP TABLE  if exists songs;
DROP TABLE  if exists genres;
DROP TABLE  if exists playlists;
DROP TABLE  if exists users_songs;
DROP TABLE  if exists users_playlists;
DROP TABLE  if exists playlists_songs;
DROP TABLE  if exists songs_genres;

CREATE TABLE users (
  username VARCHAR(25) UNIQUE,
  password TEXT NOT NULL,
  location TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  uri TEXT NOT NULL,
  artist TEXT NOT NULL,
  length INT NOT NULL,
  genre TEXT NOT NULL,
  viewed INT NOT NULL
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE users_songs (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    song_id INTEGER NOT NULL REFERENCES songs,
    PRIMARY KEY(username,song_id)
);

CREATE TABLE users_playlists (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    playlist_id INTEGER NOT NULL REFERENCES playlists,
    PRIMARY KEY(username, playlist_id)
);

CREATE TABLE playlists_songs (
    playlist_id INTEGER NOT NULL REFERENCES playlists,
    song_id INTEGER NOT NULL REFERENCES songs,
    PRIMARY KEY(playlist_id, song_id)
);

CREATE TABLE songs_genres (
    genre_id INTEGER NOT NULL REFERENCES genres,
    song_id INTEGER NOT NULL REFERENCES songs,
    PRIMARY KEY(genre_id, song_id)
);
