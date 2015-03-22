NormalizedEntry = require '../../entities/normalizedEntry'

{ PropTypes } = React

Editor = React.createClass
  displayName: 'Editor'

  propTypes:
    entry: PropTypes.instanceOf(NormalizedEntry).isRequired
    entryType: PropTypes.string.isRequired
    entryPrivacy: PropTypes.string.isRequired

  render: ->
    <span />

module.exports = Editor