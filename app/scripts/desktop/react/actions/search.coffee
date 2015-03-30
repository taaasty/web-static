Api = require '../api/api'

SearchActions =
  loadNextPage: (searchUrl) ->
    Api.search.loadNextPage searchUrl

module.exports = SearchActions