cx                    = require 'react/lib/cx'
UsersViewActions      = require '../../../actions/view/users'
ComponentMixin        = require '../../../mixins/component'
Spinner               = require '../../common/spinner/spinner'
MessengerChooserField = require './chooser/field'
MessengerChooserList  = require './chooser/list'
{ PropTypes } = React

LOADING_STATE = 'loading'
LOADED_STATE  = 'loaded'

MessengerChooser = React.createClass
  displayName: 'MessengerChooser'
  mixins: [ComponentMixin]

  propTypes:
    onItemSelect: PropTypes.func.isRequired

  getInitialState: ->
    query: ''
    predictions: []
    currentState: null

  render: ->
    chooserClasses = cx
      'messages__chooser': true
      '__open': @hasQuery()

    return <div className="messages__scroll">
             <div className={ chooserClasses }>
               <div className="messages__chooser-box">
                 <MessengerChooserField
                     value={ @state.query }
                     onChange={ @handleFieldChange } />
                 { @renderChooserList() }
               </div>
               <div className="messages__chooser-hint">
                 Начните вводить имя друга, которому хотите написать сообщение
               </div>
             </div>
           </div>

  renderChooserList: ->
    if @hasQuery()
      <MessengerChooserList
          items={ @state.predictions }
          loading={ @isLoadingState() }
          onItemSelect={ @props.onItemSelect } />

  isLoadedState:  -> @state.currentState is LOADED_STATE
  isLoadingState: -> @state.currentState is LOADING_STATE

  hasQuery: ->
    @state.query.length > 0

  activateLoadedState:  -> @safeUpdateState(currentState: LOADED_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)

  loadPredictions: (query) ->
    @activateLoadingState()

    UsersViewActions.predict query
      .then (predictions) =>
        @safeUpdateState
          predictions: predictions
          currentState: LOADED_STATE

  handleFieldChange: (query) ->
    if query.length
      @setState {query}
      @loadPredictions query
    else
      @setState @getInitialState()

module.exports = MessengerChooser