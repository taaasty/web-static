INCOMING_MESSAGE     = new Audio()
# В этот момент файл начинает скачиваться
INCOMING_MESSAGE.src = TastySettings.sound_asset_url + 'incoming_message.mp3'

AUDIO_ELEMENT_ID = 'audio-element'

window.TastySoundController =

  play: (audio) ->
    audioElement     = document.getElementById(AUDIO_ELEMENT_ID)

    unless audioElement?
      audioElement = document.createElement('audio')
      audioElement.id = AUDIO_ELEMENT_ID

    audioElement.src = audio.src
    audioElement.play()

  incomingMessage: ->
    @play INCOMING_MESSAGE
