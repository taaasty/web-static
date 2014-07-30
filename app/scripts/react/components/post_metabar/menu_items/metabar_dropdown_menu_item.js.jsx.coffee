###* @jsx React.DOM ###

window.MetabarDropdownMenuItem = React.createClass

  propTypes:
    href:  React.PropTypes.string.isRequired
    icon:  React.PropTypes.string.isRequired
    title: React.PropTypes.string.isRequired

  render: ->
    `<a href={ this.props.href }
       className="meta-item__dropdown-item">
      <i className={ "icon icon--" + this.props.icon }></i>
      { this.props.title }
    </a>`