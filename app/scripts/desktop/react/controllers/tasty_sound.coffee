window.TastySoundController =

  _buildAudioElement: (url) ->
    audioElement     = document.createElement 'audio'
    audioElement.src = gon.sound_asset_url + url
    audioElement

  play: (audio) -> audio.play()

  incomingMessage:      -> @play INCOMING_MESSAGE
  incomingNotification: -> @play INCOMING_NOTIFICATION

INCOMING_MESSAGE      = TastySoundController._buildAudioElement 'incoming_message.mp3'
INCOMING_NOTIFICATION = TastySoundController._buildAudioElement 'incoming_message.mp3'