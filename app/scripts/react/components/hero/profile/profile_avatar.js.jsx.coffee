###* @jsx React.DOM ###

window.HeroProfileAvatar = React.createClass

  propTypes:
    href:    React.PropTypes.string.isRequired
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<a href={ this.props.href }
       onClick={ this.props.onClick }>
      <div className="hero__avatar">
        <span className="avatar"
              style={{ 'background-image': 'url(http://thumbor0.tasty0.ru/S4cMlHCscI_9mCpQrtWABaYUxyY=/220x220/userpic/e6/55/37623_original.jpg)' }}>
          <img alt="lazy-cat" className="avatar__img" src="http://thumbor0.tasty0.ru/S4cMlHCscI_9mCpQrtWABaYUxyY=/220x220/userpic/e6/55/37623_original.jpg" />
        </span>
      </div>
    </a>`