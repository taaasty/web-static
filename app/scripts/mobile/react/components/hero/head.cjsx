{ PropTypes } = React

module.exports = React.createClass
  displayName: 'HeroHead'

  propTypes:
    user: PropTypes.shape(
      slug:     PropTypes.string
      title:    PropTypes.string
      tlog_url: PropTypes.string
    ).isRequired

  render: ->
    <div className="hero__head">
      <div className="hero__title">
        <span>
          <a href={ this.props.user.tlog_url }>
            { this.props.user.slug }
          </a>
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: this.props.user.title }} />
      </div>
    </div>