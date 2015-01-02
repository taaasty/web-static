{ PropTypes } = React

HeroHead = React.createClass
  displayName: 'HeroHead'

  propTypes:
    author: PropTypes.object.isRequired

  render: ->
    <div className="hero__head">
      <div className="hero__title">
        <span>
          <a href={ @props.author.tlog_url }>
            { @props.author.slug }
          </a>
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: @props.author.title }} />
      </div>
    </div>

module.exports = HeroHead