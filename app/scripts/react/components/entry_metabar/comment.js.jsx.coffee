###* @jsx React.DOM ###

window.EntryMetabarComment = React.createClass

  propTypes:
    entryCommentsUrl: React.PropTypes.string.isRequired

  render: ->
   `<span className="meta-item meta-item_comments">
      <span className="meta__content">
        <a href={ this.props.entryCommentsUrl }
           className="meta-item__common meta__link"
           title="Комментировать">
          Комментировать
        </a>
      </span>
      <span className="meta-item__common spinner spinner--8x8 ng-hide">
        <span className="spinner__icon"></span>
      </span>
    </span>`