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
          <a href={ @props.user.tlog_url }>
            { @props.user.slug }
          </a>
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: @props.user.title }} />
      </div>
    </div>