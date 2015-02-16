Api = require '../../api/api'

UsersViewActions =

  predict: (query) ->
    Api.users.predict query

module.exports = UsersViewActions