Api = require '../api/api'

SearchActions =
  loadNextPage: ({q, url, page, style}) ->
    Api.search.loadNextPage {q, url, page, style}

module.exports = SearchActions