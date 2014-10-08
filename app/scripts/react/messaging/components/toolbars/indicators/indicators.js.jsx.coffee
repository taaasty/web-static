###* @jsx React.DOM ###

window.IndicatorsToolbar = React.createClass

  render: ->
   `<nav className="toolbar toolbar--right state--open-indicators">
      <div className="toolbar__indicators">
        <IndicatorsToolbar_Messages />
        <IndicatorsToolbar_Notifications />
      </div>
    </nav>`