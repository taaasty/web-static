###* @jsx React.DOM ###

ENTRY_PRIVACY_PRIVATE   = 'private'
ENTRY_PRIVACY_PUBLIC    = 'public'
ENTRY_PRIVACY_LIVE      = 'live'
ENTRY_PRIVACY_ANONYMOUS = 'anonymous'
PRIVACY_STATES = [ ENTRY_PRIVACY_PRIVATE, ENTRY_PRIVACY_PUBLIC, ENTRY_PRIVACY_LIVE]

ICONS = {}
ICONS[ENTRY_PRIVACY_LIVE]      = 'icon--wave'
ICONS[ENTRY_PRIVACY_PRIVATE]   = 'icon--lock'
ICONS[ENTRY_PRIVACY_PUBLIC]    = 'icon--unlock-2'
ICONS[ENTRY_PRIVACY_ANONYMOUS] = 'icon--anonymous'

PREVIEW_BODY_CLASSES = {
  true:  'tlog-mode-full'
  false: 'tlog-mode-minimal'
}

PUBLIC_TITLE = {
  private:   'Видна только моим друзьям'
  public:    'Видна всем в моем тлоге'
  anonymous: 'Анонимка'
}

window.PostActions = React.createClass

  propTypes:
    entryPrivacy:    React.PropTypes.string.isRequired
    # public, private, anonymous
    tlogType:        React.PropTypes.oneOf(TLOG_TYPES).isRequired
    previewMode:     React.PropTypes.bool.isRequired
    isLoading:       React.PropTypes.bool.isRequired
    onChangePrivacy: React.PropTypes.func.isRequired
    onPreview:       React.PropTypes.func.isRequired
    onSave:          React.PropTypes.func.isRequired

  componentWillUpdate: (nextProps, nextState) ->
    $("body").removeClass PREVIEW_BODY_CLASSES[@props.previewMode]
    $("body").addClass    PREVIEW_BODY_CLASSES[nextProps.previewMode]

  render: ->
    previewButtonClasses = React.addons.classSet {
      'button':        true
      'button--grey':  true
      'state--active': @props.previewMode
    }

    postActionsClasses = React.addons.classSet {
      'post-actions':   true
      'state--loading': @props.isLoading
    }

    if @props.isLoading
      loader = `<div className="post-action post-action--loader">
                  <Spinner size={ 8 } />
                </div>`

    return `<div className={ postActionsClasses }>
              { loader }
              <div className="post-action post-action--button">
                <PostActions_VoteButton enabled={ this.isPostLive() }
                                        onChange={ this.onVoteChanged } />
              </div>
              <div className="post-action post-action--button">
                <PostActions_PrivacyButton private={ this.isPostPrivate() }
                                           onChange={ this.onPrivacyChanged } />
              </div>
              <div className="post-action post-action--button">
                <button className={ previewButtonClasses }
                        onClick={ this.props.onPreview }>
                  <span className="button__text">Предпросмотр</span>
                </button>
              </div>
              <div className="post-action post-action--button">
                <div className="button-group" ref="dropdown">
                  <button className="button button--green"
                          onClick={ this.props.onSave }>
                    <span className="button__text">{ this.buttonTitle() }</span>
                  </button>
                </div>
              </div>
            </div>`

  select: (key) ->
    @props.onChangePrivacy(key)

  isPostPublic:  -> @privacy() is ENTRY_PRIVACY_PUBLIC
  isPostPrivate: -> @privacy() is ENTRY_PRIVACY_PRIVATE
  isPostLive:    -> @privacy() is ENTRY_PRIVACY_LIVE

  isTlogAnonymous: -> @props.tlogType == ENTRY_PRIVACY_ANONYMOUS
  isTlogPublic:    -> @props.tlogType == 'public'

  privacy: ->
    return ENTRY_PRIVACY_ANONYMOUS if @isTlogAnonymous()

    @props.entryPrivacy

  buttonTitle: ->
    if @privacy() == ENTRY_PRIVACY_PRIVATE then 'Сохранить в тлоге' else 'Опубликовать'

  _getMenuItems: ->
    items = []

    return if @isTlogAnonymous()

    title_public = PUBLIC_TITLE[@props.tlogType]
    items.push `<PostActionItem title="Видна только мне"
                                selected={ this.privacy() == ENTRY_PRIVACY_PRIVATE }
                                onSelect={ this.select }
                                key={ ENTRY_PRIVACY_PRIVATE } />`

    items.push `<PostActionItem title={ title_public }
                                selected={ this.privacy() == ENTRY_PRIVACY_PUBLIC }
                                onSelect={ this.select }
                                key={ ENTRY_PRIVACY_PUBLIC } />`

    if @isTlogPublic()
      items.push `<PostActionItem title="В прямой эфир"
                                  selected={ this.privacy() == ENTRY_PRIVACY_LIVE }
                                  onSelect={ this.select }
                                  key={ ENTRY_PRIVACY_LIVE } />`

    items

  onVoteChanged: (value) ->
    if value then @select(ENTRY_PRIVACY_LIVE) else @select(ENTRY_PRIVACY_PUBLIC)

  onPrivacyChanged: (value) ->
    if value then @select(ENTRY_PRIVACY_PRIVATE) else @select(ENTRY_PRIVACY_PUBLIC)    

window.PostActionItem = React.createClass

  propTypes:
    title:    React.PropTypes.string.isRequired
    key:      React.PropTypes.string.isRequired
    selected: React.PropTypes.bool.isRequired
    onSelect: React.PropTypes.func.isRequired

  render: ->
    classes = React.addons.classSet 'dropdown-popup__link': true, 'state--active': @props.selected
    icon = ICONS[@props.key]
    
    return `<li className="dropdown-popup__item">
              <a title={ this.props.title }
                 className={ classes }
                 onClick={ this.click }>
                <i className={ "icon " + icon } />
                { this.props.title }
              </a>
            </li>`

  click: ->
    @props.onSelect @props.key