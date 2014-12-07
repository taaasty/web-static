CurrentUserServerActions =

  updateUser: (user) ->
    CurrentUserDispatcher.handleServerAction
      type: 'userUpdated'
      user: user

  updateUserpic: (userpic) ->
    CurrentUserDispatcher.handleServerAction
      type: 'userpicUpdated'
      userpic: userpic

module.exports = CurrentUserServerActions