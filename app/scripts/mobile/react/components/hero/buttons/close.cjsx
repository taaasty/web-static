{ PropTypes } = React

HeroCloseButton = React.createClass

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="hero__close"
         onClick={ this.props.onClick }>
      <i className="icon icon--cross" />
    </div>

module.exports = HeroCloseButton