global.StringHelpers =
  strip: (html) ->
    tmp = document.createElement 'DIV'
    tmp.innerHTML = html
    tmp.textContent || tmp.innerText || ''

  removeTags: (html = '') ->
    html = html.replace '<br>','||br||'
    tmp = document.createElement 'DIV'
    tmp.innerHTML = html
    html = tmp.textContent || tmp.innerText
    html.replace '||br||', ''

module.exports = StringHelpers