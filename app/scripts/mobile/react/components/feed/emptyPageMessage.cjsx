MESSAGE = 'В ленте нет записей'

FeedEmptyMessage = React.createClass

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

module.exports = FeedEmptyMessage