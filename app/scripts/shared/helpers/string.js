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
  }
};

export default StringHelpers;