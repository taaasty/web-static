/*global gon */
const BeepService = {
  makeUrl(soundName) {
    return gon.sound_asset_url + soundName;
  },

  play(soundPath) {
    if (!soundPath) {
      soundPath = this.makeUrl('incoming_message.mp3');
    }

    let soundEl, bodyEl, isHTML5;

    isHTML5 = true;
    try {
      if (typeof document.createElement('audio').play === 'undefined') {
        isHTML5 = false;
      }
    } catch (e) {
      isHTML5 = false;
    }

    bodyEl = document.getElementsByTagName('body')[0];  
    if (!bodyEl) {
      bodyEl = document.getElementsByTagName('html')[0];
    }

    soundEl = document.getElementById('beep');
    if (soundEl) {
      bodyEl.removeChild(soundEl);
    }

    if (isHTML5) {
      soundEl = document.createElement('audio');
      soundEl.setAttribute('id', 'beep');
      soundEl.setAttribute('src', soundPath);
      soundEl.play();
    } else if (navigator.userAgent.toLowerCase().indexOf('msie') > -1){    
      soundEl = document.createElement('bgsound');
      soundEl.setAttribute('id', 'beep');
      soundEl.setAttribute('loop', 1);
      soundEl.setAttribute('src', soundPath);
      bodyEl.appendChild(soundEl);
    } else {
      let paramEl;

      soundEl = document.createElement('object');
      soundEl.setAttribute('id', 'beep');
      soundEl.setAttribute('type', 'audio/mpeg');
      soundEl.setAttribute('style', 'display:none;');
      soundEl.setAttribute('data', soundPath);

      paramEl = document.createElement('param');
      paramEl.setAttribute('name', 'autostart');
      paramEl.setAttribute('value', 'false');
    
      soundEl.appendChild(paramEl);
      bodyEl.appendChild(soundEl);
      
      try {
        soundEl.Play();
      } catch (e) {
        soundEl.object.Play();
      }
    }
  },
};

export default BeepService;
