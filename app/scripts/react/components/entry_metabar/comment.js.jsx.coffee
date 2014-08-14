###* @jsx React.DOM ###

window.EntryMetabarComment = React.createClass

  propTypes:
    entryId: React.PropTypes.number.isRequired

  render: ->
   `<span className="meta-item meta-item_comments">
      <span className="meta__content">
        <a className="meta-item__common meta__link"
           title="Комментировать"
           onClick={ this.onClick }>
          Комментировать
        </a>
      </span>
      <span className="meta-item__common spinner spinner--8x8 ng-hide">
        <span className="spinner__icon"></span>
      </span>
    </span>`

  onClick: ->
    TastyEvents.trigger TastyEvents.keys.open_comment_form(@props.entryId)