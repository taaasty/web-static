(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-53712900-1', 'auto', {'siteSpeedSampleRate': 10});
if (gon && gon.user && gon.user.id) {
  ga('set', '&uid', gon.user.id);
  ga('set', 'dimension2', false);
  ga('set', 'dimension3', 99999);
  ga('set', 'dimension1', 1);
  ga('set', 'dimension4', gon.user.gender === 'm' ? 'Male' : 'Female');
  ga('set', 'dimension5', gon.user.is_privacy.toString());
}
ga('send', 'pageview');

if (gon) {
  if (gon.register_provider) {
    ga('send', 'event', 'Account', 'Registered', gon.register_provider);
  } else if (gon.logged_in) {
    ga('send', 'event', 'Account', 'Login');
  }
}

document.addEventListener('click', function(ev) {
  var app = void 0;

  if (ev.target.className === 'site-apps__badge site-apps__badge--apple-store') {
    app = 'iOS';
  } else if (ev.target.className === 'site-apps__badge site-apps__badge--google-play') {
    app = 'Android';
  }

  if (app) {
    ev.preventDefault();
    ga('send', 'event', 'UX', 'GoToApp', app, {
      hitCallback: function() {
        window.location.href = ev.target.href;
      }
    });
  }
}, false);
