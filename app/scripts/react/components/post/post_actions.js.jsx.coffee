###* @jsx React.DOM ###
#
ENTRY_PRIVACY_PRIVATE = 'private'
ENTRY_PRIVACY_PUBLIC  = 'public'
ENTRY_PRIVACY_LIVE    = 'live'
PRIVACY_STATES= [ ENTRY_PRIVACY_PRIVATE, ENTRY_PRIVACY_PUBLIC, ENTRY_PRIVACY_LIVE]

window.PostActions = React.createClass
  propTypes:
    entryId:       React.PropTypes.number.isRequred
    privacy:       React.PropTypes.string
    isTlogPrivate: React.PropTypes.bool.isRequred

  getInitialState: ->
    privacy: @props.privacy

  render: ->
    `<div className="post-actions">
      {loader()}
        <div className="post-action post-action--button">
        <button className="button button--grey">
          <span className="button__text">Предпросмотр</span>
        </button>
        </div>
        <div className="post-action post-action--button">
        <div className="button-group js-dropdown">
          <button className="button button--green">
            <span className="button__text">Опубликовать</span>
            </button><button className="button button--green-dark post-settings-button state--unlock" data-element="dropdown-toggle">
            <span className="icon"></span>
          </button>
          <div className="dropdown-popup dropdown-popup--green-dark" data-element="dropdown-menu">
            <ul className="dropdown-popup__list">
              <PostActionItem title="Видна только мне" icon="lock" selected={this.state.privacy == ENTRY_PRIVACY_PRIVATE} />
              <PostActionItem title={this.title_public()} icon="unlock" selected={this.state.privacy == ENTRY_PRIVACY_PUBLIC} />
              {this.liveAction()}
            </ul>
          </div>
        </div>
      </div>
    </div>
    `

  title_public: ->
    if @props.isTlogPrivate
      "Видна только моим друзьям"
    else
      "Видна всем в моем тлоге"

  liveAction: ->
    unless @props.isTlogPrivate
      `<PostActionItem title="В прямой эфир" icon="unlock" selected={this.state.privacy == ENTRY_PRIVACY_LIVE} />`

  loader: ->
    `<div className="post-action post-action--loader"><span className="spinner spinner--8x8"><span className="spinner__icon"></span></span></div>`

window.PostActionItem = React.createClass
  propTypes:
    title: React.PropTypes.string.isRequred
    icon:  React.PropTypes.string.isRequred
    selected: React.PropTypes.bool.isRequred

  render: ->
    classes = React.addons.classSet 'dropdown-popup__link': true, 'state--active': @props.selected
    `<li className="dropdown-popup__item">
      <a className={classes} title={this.props.title}>
        <i className={"icon icon--" + this.props.icon}></i> {this.props.title}
      </a>
      </li>`

