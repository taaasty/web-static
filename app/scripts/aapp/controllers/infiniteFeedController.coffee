AApp.controller 'infiniteFeedController', ['$scope', '$element', 'InfiniteFeed', ($scope, $element, InfiniteFeed) ->

  $scope.feed = new InfiniteFeed
    next_entry_id: parseInt $element.children().last().data('id')

  $scope.feed.busy = true

  #docReady =>
  $scope.masonryContainer = $element.get(0) #$('.js-masonry')
  $scope.masonry = new Masonry $scope.masonryContainer,
    #columnWidth:  332
    itemSelector: '.brick'
    transitionDuration: '0.4s'
    isFitWidth: true
    hiddenStyle:
      opacity: 0
      transform: 'opacity(0.001)'
    visibleStyle:
      opacity: 1
      transform: 'opacity(1)'

  $scope.masonry.bindResize()

  window.msnr = $scope.masonry

  #imagesLoaded $scope.masonryContainer, ->
    #console.log 'imagesLoaded masonry'
    #$scope.masonry.layout()
  $scope.masonry.layout()

  $scope.feed.busy = false

  $scope.nextPage = ->
    console.log 'nextPage try'
    unless $scope.masonry
      console.log 'нет masonry для infinity'
      return

    if $scope.feed.busy
      console.log 'infinity: Занято'
      return

    if $scope.feed.next_entry_id<0
      console.log 'больше нет страниц для загрузки'
      return

    console.log 'nextPage'
    $scope.feed.busy = true

    if $scope.feed.next_entry_id > 0
      console.log 'Подгружаю записи начиная с', $scope.feed.next_entry_id

      $.ajax
        url: window.location.href
        data: since_entry_id: $scope.feed.next_entry_id
        success: (data) ->
          entries = $(data)

          if entries.length>0
            $element.append entries
            $scope.masonry.appended entries

            $scope.masonry.layout()
            #imagesLoaded $scope.masonryContainer, ->
              #console.log 'imagesLoaded masonry'
              #$scope.masonry.layout()

            last_entry_id = parseInt entries.last().data('id')

            console.log 'Подгружено. Последняя запись', last_entry_id

            if $scope.feed.next_entry_id == last_entry_id
              $scope.feed.next_entry_id = -1
              $scope.feed.busy = true
            else
              $scope.feed.next_entry_id = last_entry_id
              $scope.feed.busy = false
          else
            $scope.feed.next_entry_id = -1
            $scope.feed.busy = true

          console.log 'Следующая запись', $scope.feed.next_entry_id
          console.log 'Занятость', $scope.feed.busy

          $scope.$apply()

          # Сообщаем ReactUjs что пора монтировать компоненты
          $(document).trigger 'page:change'

    else
      console.log 'В ленте больше нет записей'
  ]

AApp.factory 'InfiniteFeed', ->
  class InfiniteFeed
    constructor: ({@next_entry_id})->
    busy: false
