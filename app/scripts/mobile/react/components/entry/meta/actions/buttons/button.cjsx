{ PropTypes } = React

EntryMetaActions_Button = React.createClass
  displayName: 'EntryMetaActions_Button'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="meta-actions__button"
            onClick={ @props.onClick }>
      <i className="icon icon--dots" />
    </button>

module.exports = EntryMetaActions_Button