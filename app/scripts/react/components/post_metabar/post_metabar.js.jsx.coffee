###* @jsx React.DOM ###

window.PostMetabar = React.createClass

  propTypes:
    canEdit:     React.PropTypes.bool
    canFavorite: React.PropTypes.bool
    canWatch:    React.PropTypes.bool
    canReport:   React.PropTypes.bool
    canDelete:   React.PropTypes.bool

  getInitialState: ->
    isFavorited: false
    isWatching:  false

  render: ->
    `<span className="meta-bar">
      <span className="meta-item meta-item--comments">
        <span className="meta-item__content">
          <a className="meta-item__common meta-item__link js-comments-toggle" href="entry/2/" title="Комментировать">Комментировать</a>
        </span>
        <span className="meta-item__common spinner spinner--8x8 state--hidden js-comments-spinner"><span className="spinner__icon"></span></span>
      </span>
      <span className="meta-item meta-item--date">
        <span className="meta-item__content">
          <time className="meta-item__common" datetime="2013-05-16T22:40:03">4 дня назад</time>
        </span>
      </span>
      <span className="meta-item meta-item--tags">
        <span className="meta-item__content">
          <a className="meta-item__common meta-item__link" href="#" title="#новости">#новости</a><span className="meta-item__common">,</span> <a className="meta-item__common meta-item__link" href="#" title="#туман">#туман</a>
        </span>
      </span>
      <PostMetabarActions canEdit={ this.props.canEdit }
                          canFavorite={ this.props.canFavorite }
                          canWatch={ this.props.canWatch }
                          canReport={ this.props.canReport }
                          canDelete={ this.props.canDelete } />
    </span>`