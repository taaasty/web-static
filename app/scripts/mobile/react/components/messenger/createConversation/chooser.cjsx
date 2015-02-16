cx                    = require 'react/lib/cx'
UsersViewActions      = require '../../../actions/view/users'
ComponentMixin        = require '../../../mixins/component'
MessengerChooserField = require './chooser/field'
MessengerChooserList  = require './chooser/list'
{ PropTypes } = React

MessengerChooser = React.createClass
  displayName: 'MessengerChooser'
  mixins: [ComponentMixin]

  propTypes:
    onItemSelect: PropTypes.func.isRequired

  getInitialState: ->
    query:       ''
    predictions: []

  render: ->
    chooserClasses = cx
      'messages__chooser': true
      '__open': @hasQuery()

    return <div className="messages__scroll">
             <div className="messages__chooserbox">
               <div className={ chooserClasses }>
                 <MessengerChooserField
                     value={ @state.query }
                     onChange={ @handleFieldChange } />
                 { @renderChooserList() }
               </div>
               <div className="messages__hint">
                 Начните вводить имя друга, которому хотите написать сообщение
               </div>
             </div>
           </div>

  renderChooserList: ->
    if @hasQuery()
      <div className="messages__chooser-dropdown">
        <div className="grid-full">
          <div className="grid-full__middle">
            <MessengerChooserList
                items={ @state.predictions }
                onItemSelect={ @props.onItemSelect } />
          </div>
        </div>
      </div>

  hasQuery: ->
    @state.query.length > 0

  loadPredictions: (query) ->
    UsersViewActions.predict query
      .then @updatePredictions

  updatePredictions: (predictions) ->
    @safeUpdateState {predictions}

  handleFieldChange: (query) ->
    if query.length
      @setState {query}
      @loadPredictions query
    else
      @setState @getInitialState()

module.exports = MessengerChooser