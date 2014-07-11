$ ->
  _.each document.querySelectorAll('.mediumjs-editor'), (el) ->
    mediumjs = new Medium
      debug: true
      element: el
      modifier: 'auto'
      placeholder: 'Начните набирать текст поста. Можно без заголовка, без картинки или без видео.'
      autofocus: true
      autoHR: true

  if MediumEditor?
    mediumeditor = new MediumEditor document.querySelectorAll('.medium-editor'),
      placeholder: 'Начните набирать текст поста. Можно без заголовка, без картинки или без видео.'

    
