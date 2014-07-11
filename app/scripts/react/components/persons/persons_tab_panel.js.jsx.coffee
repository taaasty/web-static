###* @jsx React.DOM ###

window.PersonsTabPanel = PersonsTabPanel = React.createClass

  propTypes:
    data: React.PropTypes.array

  render: ->
    if @props.data
      persons = @props.data.map (person, i) ->
        `<PersonsTabPanelItem person={ person } key={ i }></PersonsTabPanelItem>`

      `<div className="tabs-panel">
        <div className="scroller scroller--persons js-scroller">
          <div className="scroller__pane js-scroller-pane">
            <ul className="persons">{ persons }</ul>
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar"></div>
          </div>
        </div>
      </div>`
    else
      `<div className="tabs-panel">
        <div className="scroller scroller--persons js-scroller">
          <div className="scroller__pane js-scroller-pane">
            <div className="popup__text">Пусто</div>
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar"></div>
          </div>
        </div>
      </div>`

module.exports = PersonsTabPanel