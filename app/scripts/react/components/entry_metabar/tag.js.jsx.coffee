###* @jsx React.DOM ###

window.EntryMetabarTag = React.createClass

  propTypes:
    tag: React.PropTypes.string.isRequired

  render: ->
   `<a href={ Routes.tag_path(this.props.tag) }
       title={ '#' + this.props.tag }
       className="meta-item__common meta-item__link">
      { '#' + this.props.tag }
    </a>`