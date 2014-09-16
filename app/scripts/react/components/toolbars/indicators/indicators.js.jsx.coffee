###* @jsx React.DOM ###

window.IndicatorsToolbar = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
   `<nav className="toolbar toolbar--right state--open-indicators">
      <div className="toolbar__indicators">
        <IndicatorsToolbar_Messages user={ this.props.user } />
      </div>
    </nav>`