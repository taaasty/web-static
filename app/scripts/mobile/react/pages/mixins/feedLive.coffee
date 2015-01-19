FeedLivePageMixin =

  getDefaultProps: ->
    currentUser:
      api_key:
        access_token: 'my_super_key'
        expires_at: '2015-01-04T18:07:07.000+03:00'
        user_id: 232992
      authentications: [{
        id: 5
        image: 'https://pp.vk.me/c618020/v618020992/50e6/UtWWgge-iQc.jpg'
        name: 'Сергей Лаптев'
        provider: 'vkontakte'
        sex: null
        uid: '17202995'
        url: 'http://vk.com/my_super_key'
      }]
      available_notifications: true
      confirmation_email: null
      created_at: '2014-06-18T14:27:22.000+04:00'
      design:
        backgroundBrightness: 75
        background_url: 'http://taaasty.ru/assets/backgrounds/cf/78/1881243_4k_Resolution_Game_Wallpaper__12_fullsize.jpeg'
        coverAlign: 'justify'
        feedColor: 'black'
        feedOpacity: 0.62
        fontType: 'sans'
        headerColor: 'white'
      email: 'iamsergeylaptev@gmail.com'
      features:
        notification: false
        search: true
      id: 232992
      is_confirmed: true
      is_daylog: false
      is_female: false
      is_privacy: true
      name: 'sergeylaptev'
      private_entries_count: 0
      public_entries_count: 3
      slug: 'sergeylaptev'
      title: 'To be continued...'
      tlog_url: 'http://taaasty.ru/~sergeylaptev'
      total_entries_count: 3
      updated_at: '2014-12-17T11:54:20.000+03:00'
      userpic:
        default_colors:
          background: '#b5c31e'
          name: '#ffffff'
        kind: 'user'
        large_url: 'http://taaasty.ru/assets/userpic/22/36/232992_large.jpeg'
        original_url: 'http://taaasty.ru/assets/userpic/22/36/232992_original.jpeg'
        symbol: 's'
        thumb64_url: 'http://taaasty.ru/assets/userpic/22/36/232992_thumb64.jpeg'
        thumb128_url: 'http://taaasty.ru/assets/userpic/22/36/232992_thumb128.jpeg'
        thumbor_path: 'userpic/22/36/232992_original.jpeg'
    entries: [{
      author:
        created_at: "2014-11-08T14:07:32.000+03:00"
        features:
          notification: false
          search: false
        id: 244412
        is_daylog: false
        is_female: false
        is_privacy: false
        name: "hyperwax"
        private_entries_count: 0
        public_entries_count: 20
        slug: "hyperwax"
        title: ""
        tlog_url: "http://taaasty.com/~hyperwax"
        total_entries_count: 22
        updated_at: "2015-01-16T19:30:05.000+03:00"
        userpic:
          default_colors:
            background: "#eb4656"
            name: "#ffffff"
          kind: "user"
          large_url: "http://taaasty.com/assets/userpic/25/ff/244412_large.jpg"
          original_url: "http://taaasty.com/assets/userpic/25/ff/244412_original.jpg"
          symbol: "h"
          thumb64_url: "http://taaasty.com/assets/userpic/25/ff/244412_thumb64.jpg"
          thumb128_url: "http://taaasty.com/assets/userpic/25/ff/244412_thumb128.jpg"
          thumbor_path: "userpic/25/ff/244412_original.jpg"
      can_delete: false
      can_edit: false
      can_favorite: true
      can_report: true
      can_vote: true
      can_watch: true
      comments_count: 0
      comments_info:
        comments: []
        from_comment_id: null
        order: "desc"
        to_comment_id: null
        total_count: 0
      created_at: "2015-01-16T19:30:05.000+03:00"
      entry_url: "http://taaasty.com/~hyperwax/19616804"
      id: 19619777
      image_attachments: [
        content_type: "image/jpeg"
        created_at: "2015-01-16T19:30:05.000+03:00"
        frames_count: 1
        id: 16794460
        image:
          geometry:
            height: 1200
            width: 800
          path: "att/8c/79/16794460_244412_19616804_bf44b698-5d7b-4480-b555-4fca3439ce2f.jpg"
          source: "image_attachment"
          title: null
          url: "http://taaasty.com/assets/att/8c/79/16794460_244412_19616804_bf44b698-5d7b-4480-b555-4fca3439ce2f.jpg"
      ]
      image_url: null
      is_favorited: false
      is_voteable: true
      is_watching: false
      privacy: "live"
      rating:
        entry_id: 19616804
        is_voteable: true
        is_voted: false
        rating: 0
        votes: 0
      title: ""
      type: "image"
      updated_at: "2015-01-16T19:30:05.000+03:00"
      via: null
    }]
    feed:
      backgroundUrl: 'http://taaasty.com/images/hero-cover.jpg'
      entriesCount: 41

module.exports = FeedLivePageMixin