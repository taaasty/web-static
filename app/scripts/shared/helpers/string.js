let StringHelpers = {
  strip(html) {
    let tmp = document.createElement('div');

    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  },

  removeTags(html) {
    html = html || '';
    html = html.replace('<br>', '||br||');
    html = this.strip(html);
    return html.replace('||br||', '');
  },

  cleanWordPaste(text) {
    let tmp = document.createElement('div');

    tmp.innerHTML = text;
    let newString = tmp.textContent || tmp.innerText || '';
    // this next piece converts line breaks into break tags
    // and removes the seemingly endless crap code
    newString = newString.replace(/\n\n/g, '<br />').replace(/.*<!--.*-->/g, '');
    // this next piece removes any break tags (up to 10) at beginning
    for (let i = 0; i < 10; i++) {
      if (newString.substr(0, 6) === '<br />') { 
        newString = newString.replace('<br />', '');
      }
    }

    return newString;
  }
};

global.StringHelpers = StringHelpers;

export default StringHelpers;