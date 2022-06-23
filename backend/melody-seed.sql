DELETE FROM songs_genres;
DELETE FROM genres;
DELETE FROM playlists_songs;
DELETE FROM playlists;
DELETE FROM songs;
DELETE FROM users;

INSERT INTO users (username, password, location , email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'United State',
        'test@test.com'),
        ('aaa',
        '$2b$12$JoE1axeh/EK3u9i2bXiDOumivgjuJuEfr0weptgfvQ3/AmEgsgOq6',
        'United State',
        'a@a.com');

INSERT INTO songs(id, title, uri, artist, length, viewed)
VALUES (1, 'testTitle1', 'testUri1', 'testArtist1', 'testLength1', 200),
(2, 'testTitle2', 'testUri2', 'testArtist2', 'testLength2', 200),
(3, 'testTitle3', 'testUri3', 'testArtist3', 'testLength3', 200),
(4, 'testTitle4', 'testUri4', 'testArtist4', 'testLength4', 200),
(5, 'testTitle5', 'testUri5', 'testArtist5', 'testLength5', 200),
(6, 'testTitle6', 'testUri6', 'testArtist6', 'testLength6', 200),
(7, 'testTitle7', 'testUri7', 'testArtist7', 'testLength7', 200),
(8, 'testTitle8', 'testUri8', 'testArtist8', 'testLength8', 200),
(9, 'testTitle9', 'testUri9', 'testArtist9', 'testLength9', 200),
(10, 'testTitle10', 'testUri10', 'testArtist10', 'testLength10', 200);

INSERT INTO playlists(id, username, name, image_url)
VALUES (1, 'testuser', 'testPlaylist1', 'testImage1'),
(2, 'testuser', 'testPlaylist2', 'testImage2'),
(3, 'testuser', 'testPlaylist3', 'testImage3');

INSERT INTO playlists_songs(id, song_id, playlist_id)
VALUES (1, 1, 1),
(2, 2, 1),
(3, 2, 2),
(4, 2, 3),
(5, 3, 2),
(6, 4, 2),
(7, 5, 3);

INSERT INTO genres(id, name)
VALUES (1,'genre1'),
(2, 'genre2'),
(3, 'genre3'),
(4, 'genre4'),
(5, 'genre5'),
(6, 'genre6'),
(7, 'genre7'),
(8, 'genre8'),
(9, 'genre9'),
(10, 'genre10');

INSERT INTO songs_genres(id, genre_id, song_id)
VALUES (1, 1, 1),
(2, 2, 1),
(3, 2, 2),
(4, 2, 3),
(5, 3, 2),
(6, 4, 2),
(7, 5, 3);
