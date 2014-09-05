###* @jsx React.DOM ###

ENTRY_PRIVACY_PRIVATE   = TLOG_TYPE_PRIVATE   = 'private'
ENTRY_PRIVACY_PUBLIC    = TLOG_TYPE_PUBLIC    = 'public'
ENTRY_PRIVACY_ANONYMOUS = TLOG_TYPE_ANONYMOUS = 'anonymous'
ENTRY_PRIVACY_LIVE      = 'live'

PREVIEW_BODY_CLASSES = {
  true:  'tlog-mode-full'
  false: 'tlog-mode-minimal'
}

window.PostActions = React.createClass

  propTypes:
    entryPrivacy:    React.PropTypes.string.isRequired
    tlogType:        React.PropTypes.oneOf(TLOG_TYPES).isRequired
    previewMode:     React.PropTypes.bool.isRequired
    isLoading:       React.PropTypes.bool.isRequired
    onChangePrivacy: React.PropTypes.func.isRequired
    onPreview:       React.PropTypes.func.isRequired
    onSave:          React.PropTypes.func.isRequired

  componentWillUpdate: (nextProps) ->
    $("body").removeClass PREVIEW_BODY_CLASSES[@props.previewMode]
             .addClass    PREVIEW_BODY_CLASSES[nextProps.previewMode]

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

    unless @isPostPrivate() || @isTlogPrivate()
      voteButton = `<div className="post-action post-action--button">
                      <PostActions_VoteButton enabled={ this.isPostLive() }
                                              onChange={ this.onVoteChanged } />
                    </div>`

    return `<div className={ postActionsClasses }>
              { loader }
              { voteButton }
              <div className="post-action post-action--button">
                <PostActions_PrivacyButton isVoteEnabled={ this.isPostLive() }
                                           private={ this.isPostPrivate() }
                                           onChange={ this.onPrivacyChanged } />
              </div>
              <div className="post-action post-action--button">
                <button className={ previewButtonClasses }
                        onClick={ this.props.onPreview }>
                  <span className="button__text">Предпросмотр</span>
                </button>
              </div>
              <div className="post-action post-action--button">
                <div ref="dropdown"
                     className="button-group">
                  <button className="button button--green"
                          onClick={ this.props.onSave }>
                    <span className="button__text">
                      { this._getSaveButtonText() }
                    </span>
                  </button>
                </div>
              </div>
            </div>`

  isPostPublic:    -> @props.entryPrivacy is ENTRY_PRIVACY_PUBLIC
  isPostPrivate:   -> @props.entryPrivacy is ENTRY_PRIVACY_PRIVATE
  isPostLive:      -> @props.entryPrivacy is ENTRY_PRIVACY_LIVE
  isPostAnonymous: -> @props.entryPrivacy is ENTRY_PRIVACY_ANONYMOUS

  isTlogAnonymous: -> @props.tlogType is TLOG_TYPE_ANONYMOUS
  isTlogPublic:    -> @props.tlogType is TLOG_TYPE_PUBLIC
  isTlogPrivate:   -> @props.tlogType is TLOG_TYPE_PRIVATE

  _getSaveButtonText: ->
    if @isPostPrivate() then 'Сохранить в тлоге' else 'Опубликовать'

  onVoteChanged: (value) ->
    newEntryPrivacy = if value then ENTRY_PRIVACY_LIVE else ENTRY_PRIVACY_PUBLIC

    @props.onChangePrivacy newEntryPrivacy

  onPrivacyChanged: (value) ->
    newEntryPrivacy = if value then ENTRY_PRIVACY_PRIVATE else ENTRY_PRIVACY_PUBLIC

    @props.onChangePrivacy newEntryPrivacy