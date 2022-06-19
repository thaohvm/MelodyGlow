DROP TABLE  if exists users;
DROP TABLE  if exists songs;
DROP TABLE  if exists genres;
DROP TABLE  if exists playlists;
DROP TABLE  if exists users_songs;
DROP TABLE  if exists users_playlists;
DROP TABLE  if exists playlists_songs;
DROP TABLE  if exists songs_genres;

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
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
  length TEXT NOT NULL,
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
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
  song_id INTEGER NOT NULL REFERENCES songs
);

CREATE TABLE users_playlists (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
  playlist_id INTEGER NOT NULL REFERENCES playlists
);

CREATE TABLE playlists_songs (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER NOT NULL REFERENCES playlists ON DELETE CASCADE,
  song_id INTEGER NOT NULL REFERENCES songs
);

CREATE TABLE songs_genres (
  id SERIAL PRIMARY KEY,
  genre_id INTEGER NOT NULL REFERENCES genres ON DELETE CASCADE,
  song_id INTEGER NOT NULL REFERENCES songs
);
