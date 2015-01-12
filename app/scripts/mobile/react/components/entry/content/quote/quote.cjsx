{ PropTypes } = React

QuoteEntryContent = React.createClass
  displayName: 'QuoteEntryContent'

  propTypes:
    text:   PropTypes.string.isRequired
    source: PropTypes.string.isRequired

  render: ->
    <div className="post__content">
      <blockquote className="blockquote">
        <span className="laquo">«</span>
        <span>{ @props.text }</span>
        <span className="raquo">»</span>
        <div className="blockquote__caption">
          { @props.source }
        </div>
      </blockquote>
    </div>

module.exports = QuoteEntryContent