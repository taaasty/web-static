CHANGE_EVENT = 'change'

_notifications = []

window.NotificationsStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  # getNotifications: -> _notifications

  getNotifications: ->
    [{
      id: 1
      online: false
      action: 'ответил на ваш комментарий'
      text: 'Ох как я согласен!'
      image: null
      user: {
        created_at: "2014-01-04T14:47:02.000+04:00"
        features: {
          chat: true
          search: false
        }
        id: 220444
        is_daylog: false
        is_female: false
        is_privacy: false
        name: "densetos"
        private_entries_count: 0
        public_entries_count: 11
        slug: "densetos"
        title: "伝説的なオペレーティングシステム"
        tlog_url: "http://taaasty.ru/@densetos"
        total_entries_count: 11
        updated_at: "2014-10-07T23:45:20.000+04:00"
        userpic: {
          default_colors: {
            background: "#44d068"
            name: "#ffffff"
          }
          large_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_large.jpg"
          original_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_original.jpg"
          thumb64_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_thumb64.jpg"
          thumb128_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_thumb128.jpg"
          thumbor_path: "userpic/6b/f8/220444_original.jpg"
        }
      }
    }, {
      id: 2
      online: true
      action: 'Упомянул вас в комментарии'
      text: 'Most instances of neuroplasticity-based changes in the brain are much more...'
      image: 'images/images/image_22.jpg'
      user: {
        created_at: "2011-05-22T18:55:14.000+04:00"
        features: {
          chat: true
          search: false
        }
        id: 48345
        is_daylog: false
        is_female: true
        is_privacy: false
        name: "pandemiya"
        private_entries_count: 0
        public_entries_count: 1617
        slug: "pandemiya"
        title: "..и пусть я как эмо буду бухой ночами реветь, а днями строить из себя супермена."
        tlog_url: "http://taaasty.ru/@pandemiya"
        total_entries_count: 1626
        updated_at: "2014-10-07T23:18:29.000+04:00"
        userpic: {
          default_colors: {
            background: "#eb4656"
            name: "#ffffff"
          }
          large_url: "http://taaasty.ru/assets/userpic/de/a0/48345_large.jpg"
          original_url: "http://taaasty.ru/assets/userpic/de/a0/48345_original.jpg"
          thumb64_url: "http://taaasty.ru/assets/userpic/de/a0/48345_thumb64.jpg"
          thumb128_url: "http://taaasty.ru/assets/userpic/de/a0/48345_thumb128.jpg"
          thumbor_path: "userpic/de/a0/48345_original.jpg"
        }
      }
    }, {
      id: 3
      online: true
      action: 'прокомментировала вашу запись "Как вы думаете, что мн..."'
      text: '@madworld присоединяйся)'
      image: null
      user: {
        created_at: "2011-12-11T03:20:32.000+04:00"
        features: {
          chat: true
          search: false
        }
        id: 98945
        is_daylog: false
        is_female: false
        is_privacy: false
        name: "nof1000"
        private_entries_count: 16
        public_entries_count: 587
        slug: "nof1000"
        title: "Programmer &amp; Designer"
        tlog_url: "http://taaasty.ru/@nof1000"
        total_entries_count: 609
        updated_at: "2014-09-30T02:31:59.000+04:00"
        userpic: {
          default_colors: {
            background: "#3382da"
            name: "#ffffff"
          }
          large_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_large.png"
          original_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_original.png"
          thumb64_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_thumb64.png"
          thumb128_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_thumb128.png"
          thumbor_path: "userpic/a5/d9/98945_original.png"
        }
      }
    }]

}

# NotificationsStore.dispatchToken = MessagingDispatcher.register (payload) ->
#   action = payload.action

#   switch action.type
#     when 'messagesLoaded'
#       NotificationsStore.pushMessages action.conversationId, action.messages
#       NotificationsStore.sortByAsc(action.conversationId)
#       NotificationsStore.emitChange()
#       break