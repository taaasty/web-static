let gon = {
  version: 'static-development',
  env: 'static-development',
  host: AppStorage.getItem('host') || 'http://taaasty.com/',
  api_host: AppStorage.getItem('api_host') || 'http://taaasty.com/api/',
  localesPath: '../locales',
  localesVersion: '1.0.0',
  locale: 'en',
  // taaasty development app
  pusher: {
    key: '40dbf1d864d4b366b5e6'
  },
  user: {
    "id": parseInt(AppStorage.getItem('userId')) || 232992,
    "locale": "ru",
    "name": "sergeylaptev",
    "slug": "sergeylaptev",
    "title": "",
    "is_female": false,
    "is_daylog": false,
    "tlog_url": "http://taaasty.com/~sergeylaptev",
    "created_at": "2014-06-18T14:27:22.000+04:00",
    "updated_at": "2015-04-25T02:09:59.000+03:00",
    "is_premium": true,
    "has_design_bundle": true,
    "total_entries_count": 63,
    "private_entries_count": 55,
    "public_entries_count": 8,
    "saw_guide": true,
    "saw_guide_design": false,
    "is_privacy": true,
    "confirmation_email": null,
    "email": "sergeylaptev@gmail.com",
    "is_confirmed": false,
    "available_notifications": true,
    "authentications": [
      {
        "id": 5,
        "provider": "vkontakte",
        "uid": "17202124",
        "name": "Сергей Лаптев",
        "sex": null,
        "image": "https://pp.vk.me/c618020/v6180202/50e6/UtWWgge-iQc.jpg",
        "url": "http://vk.com/serlaptev"
      }
    ],
    "api_key": {
      "access_token": AppStorage.getItem('userToken') || "dasd;lkCKJ123",
      "user_id": 232992,
      "expires_at": "2015-01-04T18:07:07.000+03:00"
    },
    "design": {
      "headerFont": "nautilus",
      "headerSize": "middle",
      "headerColor": "#efa114",
      "backgroundColor": "#6c7a89",
      "backgroundImageUrl": "http://taaasty.com/assets/bgs/99/0f/2565_original.jpeg",
      "backgroundId": 2565,
      "backgroundImageEnabled": true,
      "backgroundAlignment": "justify",
      "feedBackgroundColor": "#6c7a89",
      "feedFont": "ptsans",
      "feedFontColor": "#c6c9cc",
      "feedOpacity": 0.95,
      "version": 1,
      "headColor": "white",
      "feedColor": "white",
      "fontType": "sans",
      "background_url": "http://taaasty.com/assets/bgs/99/0f/2565_original.jpeg"
    },
    "userpic": {
      "original_url": "http://taaasty.com/assets/userpic/6d/ec/232992_original.jpeg",
      "large_url": "http://taaasty.com/assets/userpic/6d/ec/232992_large.jpeg",
      "thumb128_url": "http://taaasty.com/assets/userpic/6d/ec/232992_thumb128.jpeg",
      "thumb64_url": "http://taaasty.com/assets/userpic/6d/ec/232992_thumb64.jpeg",
      "thumbor_path": "userpic/6d/ec/232992_original.jpeg",
      "symbol": "s",
      "kind": "user",
      "default_colors": {
        "background": "#b5c31e",
        "name": "#ffffff"
      }
    },
    "features": {
      "search": true,
      "notification": false
    }
  }
};

export default gon;