###* @jsx React.DOM ###
"use strict"

ENTRY_PRIVACY_PRIVATE = 'private'
ENTRY_PRIVACY_PUBLIC  = 'public'
ENTRY_PRIVACY_LIVE    = 'live'
PRIVACY_STATES= [ ENTRY_PRIVACY_PRIVATE, ENTRY_PRIVACY_PUBLIC, ENTRY_PRIVACY_LIVE]

ICONS = {}
ICONS[ENTRY_PRIVACY_LIVE]    = 'icon--wave'
ICONS[ENTRY_PRIVACY_PRIVATE] = 'icon--lock'
ICONS[ENTRY_PRIVACY_PUBLIC]  = 'icon--unlock'

PREVIEW_BODY_CLASSES =  { true:  'tlog-mode-full', false: 'tlog-mode-minimal' }

window.PostActions = React.createClass
  propTypes:
    privacy:         React.PropTypes.string.isRequired
    isTlogPrivate:   React.PropTypes.bool.isRequired
    onChangePrivacy: React.PropTypes.func.isRequired
    onPreview:       React.PropTypes.func.isRequired
    previewMode:     React.PropTypes.bool.isRequired
    isLoading:       React.PropTypes.bool.isRequired

  select: (key) ->
    @props.onChangePrivacy(key)

  privacy: ->
    @props.privacy

  componentWillUpdate: (nextProps, nextState) ->
    $("body").removeClass PREVIEW_BODY_CLASSES[@props.previewMode]
    $("body").addClass    PREVIEW_BODY_CLASSES[nextProps.previewMode]

  componentDidMount: ->
    $(@refs.dropdown.getDOMNode()).dropdown()

  render: ->
    previewButtonClasses = React.addons.classSet button: true, 'button--grey': true, 'state--active': @props.previewMode

    postActionsClasses = React.addons.classSet 'state--loading': @props.isLoading

    `<div className="post-actions">
      {this.loader()}
        <div className="post-action post-action--button">
          <button className={previewButtonClasses} onClick={this.props.onPreview}>
            <span className="button__text">Предпросмотр</span>
          </button>
        </div>
        <div className="post-action post-action--button">
          <div className="button-group" ref="dropdown">
            <button className="button button--green"><span className="button__text">{this.buttonTitle()}</span></button>
            <button className="button button--green-dark post-settings-button" data-element="dropdown-toggle">{this.stateIcon()}</button>
            <div className="dropdown-popup dropdown-popup--green-dark" data-element="dropdown-menu">
              <ul className="dropdown-popup__list">
                <PostActionItem title="Видна только мне"    onSelect={this.select} key={ ENTRY_PRIVACY_PRIVATE } selected={this.privacy() == ENTRY_PRIVACY_PRIVATE} />
                <PostActionItem title={this.title_public()} onSelect={this.select} key={ ENTRY_PRIVACY_PUBLIC } selected={this.privacy() == ENTRY_PRIVACY_PUBLIC} />
                {this.liveAction()}
              </ul>
            </div>
          </div>
        </div>
      </div>`

  buttonTitle: ->
    if @privacy() == ENTRY_PRIVACY_PRIVATE
      'Сохранить в тлоге'
    else
      'Опубликовать'


  stateIcon: ->
    icons= icon: true
    icons[ICONS[@privacy()]] = true
    `<span className={React.addons.classSet(icons)}></span>`

  title_public: ->
    if @props.isTlogPrivate
      "Видна только моим друзьям"
    else
      "Видна всем в моем тлоге"

  liveAction: ->
    unless @props.isTlogPrivate
      `<PostActionItem title="В прямой эфир" onSelect={this.select} key={ENTRY_PRIVACY_LIVE} selected={this.privacy() == ENTRY_PRIVACY_LIVE} />`

  loader: ->
    `<div className="post-action post-action--loader"><span className="spinner spinner--8x8"><span className="spinner__icon"></span></span></div>`

window.PostActionItem = React.createClass
  propTypes:
    title:    React.PropTypes.string.isRequired
    key:      React.PropTypes.string.isRequired
    selected: React.PropTypes.bool.isRequired
    onSelect: React.PropTypes.func.isRequired

  click: ->
    @props.onSelect @props.key

  render: ->
    classes = React.addons.classSet 'dropdown-popup__link': true, 'state--active': @props.selected
    icon = ICONS[@props.key]
    `<li className="dropdown-popup__item">
      <a className={classes} onClick={this.click} title={this.props.title}>
        <i className={"icon " + icon}></i> {this.props.title}
      </a>
      </li>`

