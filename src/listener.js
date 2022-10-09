const autoBind = require('auto-bind');

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylists(playlistId);
      const songs = await this._playlistsService.getSongsByPlaylistId(playlistId);

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(
        {
          playlist:
            {
              ...playlist,
              songs,
            },
        },
      ));

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
