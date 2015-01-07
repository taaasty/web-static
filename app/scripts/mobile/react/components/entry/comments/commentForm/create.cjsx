EntryViewActions = require '../../../../actions/view/entry'
CommentForm      = require '../commentForm'
ComponentMixin   = require '../../../../mixins/component'
{ PropTypes } = React

SHOW_STATE    = 'show'
LOADING_STATE = 'loading'

#TODO: i18n
BUTTON_TITLE      = 'Отпр'
FIELD_PLACEHOLDER = 'Добавить комментарий'

CommentCreateForm = React.createClass
  displayName: 'CommentCreateForm'
  mixins: [ComponentMixin]

  propTypes:
    entryId: PropTypes.number.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    <CommentForm
        ref="commentForm"
        buttonTitle={ BUTTON_TITLE }
        placeholder={ FIELD_PLACEHOLDER }
        disabled={ @isLoadingState() }
        onSubmit={ @createComment } />

  isValid: (text) -> !!text.match /./

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)

  clearForm: ->
    @refs.commentForm.clearForm()

  createComment: (text) ->
    return unless @isValid text

    EntryViewActions.createComment @props.entryId, text
      .then @clearForm
      .always @activateShowState

module.exports = CommentCreateForm