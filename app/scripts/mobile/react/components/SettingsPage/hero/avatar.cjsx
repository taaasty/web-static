CurrentUserViewAcitons = require '../../../actions/view/currentUser'
Spinner                = require '../../common/spinner/spinner'
UserAvatar             = require '../../common/avatar/user'
{ PropTypes } = React

SHOW_STATE    = 'show'
LOADING_STATE = 'loading'

SettingsHeroAvatar = React.createClass
  displayName: 'SettingsHeroAvatar'

  propTypes:
    user: PropTypes.object.isRequired

  getInitialState: ->
    currentState: SHOW_STATE
    previewImage: null

  render: ->
    <div className="settings__hero__avatar">
      { @renderAvatar() }
      <span className="settings__hero__avatar-overlay">
        { @renderContent() }
      </span>
    </div>

  renderAvatar: ->
    if @state.previewImage?
      #COMMENT: Chrome's console freeze when try to show base64 path
      <span className="avatar" style={{ backgroundImage: "url('#{@state.previewImage}')" }} />
    else
      <UserAvatar user={ @props.user } size={ 220 } />

  renderContent: ->
    #COMMENT: We shouldn't allow user select another image while loading state is active
    if @isLoadingState()
      <span className="settings__hero__avatar-spinner">
        <Spinner size={ 30 } />
      </span>
    else
      <span className="form-choose-file">
        <span className="form-choose-file__text">
          <i className="icon icon--pencil" />
        </span>
        <input ref="fileInput"
               type="file"
               accept="image/*"
               className="form-choose-file__input"
               onChange={ @handleChange } />
      </span>

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateLoadingState: -> @setState(currentState: LOADING_STATE)
  activateShowState:    -> @setState(currentState: SHOW_STATE)

  updatePreviewImage: (file) ->
    reader = new FileReader()
    reader.onload = @showPreviewImage
    reader.readAsDataURL file

  showPreviewImage: (e) ->
    @setState(previewImage: e.target.result)

  hidePreviewImage: ->
    @setState(previewImage: null)

  uploadImage: (file) ->
    @activateLoadingState()

    formData = new FormData()
    formData.append 'file', file

    CurrentUserViewAcitons.updateAvatar formData
      .then   @hidePreviewImage
      .always @activateShowState

  handleChange: (e) ->
    files = e.target.files

    if files?[0]
      @updatePreviewImage files[0]
      @uploadImage files[0]

module.exports = SettingsHeroAvatar