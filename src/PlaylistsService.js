const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const playlist = await this._pool.query(query);
    return playlist.rows[0];
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT s.id , s.title, s.performer FROM playlist_songs ps LEFT JOIN songs s ON s.id = ps.song_id WHERE ps.playlist_id = $1',
      values: [playlistId],
    };

    const playlist = await this._pool.query(query);
    return playlist.rows;
  }
}

module.exports = PlaylistsService;
