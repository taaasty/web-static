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

window.PostActions = React.createClass
  propTypes:
    entryId:       React.PropTypes.number.isRequired
    privacy:       React.PropTypes.string
    isTlogPrivate: React.PropTypes.bool.isRequired

  getInitialState: ->
    privacy: @props.privacy

  select: (key) ->
    @setState privacy: key

  render: ->
    `<div className="post-actions">
      {this.loader()}
        <div className="post-action post-action--button">
        <button className="button button--grey">
          <span className="button__text">Предпросмотр</span>
        </button>
        </div>
        <div className="post-action post-action--button">
        <div className="button-group js-dropdown">
          <button className="button button--green"><span className="button__text">{this.buttonTitle()}</span></button>
          <button className="button button--green-dark post-settings-button" data-element="dropdown-toggle">{this.stateIcon()}</button>
          <div className="dropdown-popup dropdown-popup--green-dark" data-element="dropdown-menu">
            <ul className="dropdown-popup__list">
              <PostActionItem title="Видна только мне"    onSelect={this.select} key={ ENTRY_PRIVACY_PRIVATE } selected={this.state.privacy == ENTRY_PRIVACY_PRIVATE} />
              <PostActionItem title={this.title_public()} onSelect={this.select} key={ ENTRY_PRIVACY_PUBLIC } selected={this.state.privacy == ENTRY_PRIVACY_PUBLIC} />
              {this.liveAction()}
            </ul>
          </div>
        </div>
      </div>
    </div>`

  buttonTitle: ->
    if @state.privacy == ENTRY_PRIVACY_PRIVATE
      'Сохранить'
    else
      'Опубликовать'


  stateIcon: ->
    icons= icon: true
    icons[ICONS[@state.privacy]] = true
    `<span className={React.addons.classSet(icons)}></span>`

  title_public: ->
    if @props.isTlogPrivate
      "Видна только моим друзьям"
    else
      "Видна всем в моем тлоге"

  liveAction: ->
    unless @props.isTlogPrivate
      `<PostActionItem title="В прямой эфир" onSelect={this.select} key={ENTRY_PRIVACY_LIVE} selected={this.state.privacy == ENTRY_PRIVACY_LIVE} />`

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

