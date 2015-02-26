PageMixin = require './mixins/page'
Auth      = require '../components/auth/auth'
{ PropTypes } = React

AuthPage = React.createClass
  displayName: 'AuthPage'
  mixins: [PageMixin]

  render: ->
    <div className="layout">
      <div className="layout__body">
        <Auth fixed={ true } />
      </div>
    </div>

module.exports = AuthPage