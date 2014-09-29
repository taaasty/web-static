window.TastySoundController =

  _buildAudioElement: (url) ->
    audioElement     = document.createElement 'audio'
    audioElement.src = TastySettings.sound_asset_url + url
    audioElement

  play: (audio) -> audio.play()

  incomingMessage: -> @play INCOMING_MESSAGE

INCOMING_MESSAGE = TastySoundController._buildAudioElement 'incoming_message.mp3'