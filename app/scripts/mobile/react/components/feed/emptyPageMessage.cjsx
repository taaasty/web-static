MESSAGE = 'В ленте нет записей'

FeedEmptyPageMessage = React.createClass
  displayName: 'FeedEmptyPageMessage'

  render: ->
    <div className="post">
      <div className="post__content">
        <div className="post__header">
          <h1 className="post__title">
            { MESSAGE }
          </h1>
        </div>
      </div>
    </div>

module.exports = FeedEmptyPageMessage