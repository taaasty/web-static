###* @jsx React.DOM ###

window.SearchButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<div className="search__button"
         onClick={ this.props.onClick }>
      <i className="icon icon--magnifier" />
    </div>`