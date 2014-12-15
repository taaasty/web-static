RelationshipButtonMixin =

  follow:                         -> console.log 'follow'
  unfollow:                       -> console.log 'unfollow'
  unfollowFromYourself: (options) -> console.log 'unfollowFromYourself'
  cancel:               (options) -> console.log 'cancel'
  ignore:                         -> console.log 'ignore'
  approve:              (options) -> console.log 'approve'
  disapprove:           (options) -> console.log 'disapprove'

module.exports = RelationshipButtonMixin