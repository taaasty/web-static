#  require JSXTransformer
#= require react
#= require react_ujs
#= require_tree ./mixins
#= require_tree ./components
#= require_tree ./controllers

window.ReactApp =
  
  start: ({user}) ->
    console.log 'ReactApp start'
    console.debug? "Залогинен пользователь", user.get('slug') if user?

    $(document).on 'page:change', ReactUjs.mountReactComponents

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у юзеров
    $('[toolbar-settings-click]').click =>
      @popup.show ToolbarSettings,
        title: 'Настройки',
        user:   user

    personsContainer = document.querySelectorAll('[popup-persons-container]')[0]
    React.renderComponent Persons({
      title: 'Управление подписками'
      tabs:  [
        {title: 'Подписки', type: 'subscriptions', count: 342}
        {title: 'Подписчики', type: 'subscribers', count: 342}
        {title: 'Запросы', type: 'requests', count: 342}
      ]
      tabsData: {
        subscriptions: [{
          name: '88mm'
          count: '594 записи'
          avatar: 'http://taaasty.ru/image.jpg'
          avatarText: '8'
          followUserId: 5881
          isFollow: true
        }, {
          name: 'Photo_art'
          count: '594 записи'
          avatar: 'http://taaasty.ru/image3.jpg'
          avatarText: 'P'
          followUserId: 5281
          isFollow: true
        }, {
          name: 'whereismymind'
          count: 'Нет записей'
          avatar: 'http://taaasty.ru/image2.jpg'
          avatarText: 'W'
          followUserId: 2414
          isFollow: true
        }]
        subscribers: [{
          name: 'Ololoshka Subscriber'
          count: '524 записи'
          avatar: 'http://taaasty.ru/image5.jpg'
          avatarText: 'O'
          followUserId: 58281
          isFollow: true
        }, {
          name: 'Anatoliy Subscriber'
          count: '524 записи'
          avatar: 'http://taaasty.ru/image7.jpg'
          avatarText: 'A'
          followUserId: 53381
          isFollow: true
        }]
        requests: [{
          name: 'Ololoshka Request'
          count: '514 записи'
          avatar: 'http://taaasty.ru/image6.jpg'
          avatarText: 'O'
          followUserId: 58281
          isFollow: false
        }]
      }}), personsContainer

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic
