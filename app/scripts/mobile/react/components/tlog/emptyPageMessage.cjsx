MESSAGE = -> t 'tlog_empty_page'

TlogEmptyPageMessage = React.createClass
  displayName: 'TlogEmptyPageMessage'

  render: ->
    <div className="post">
      <div className="post__content">
        <div className="post__header">
          <h1 className="post__title">
            { MESSAGE() }
          </h1>
        </div>
      </div>
    </div>

module.exports = TlogEmptyPageMessage