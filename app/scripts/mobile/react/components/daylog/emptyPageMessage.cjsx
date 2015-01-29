DaylogEmptyPageMessage = React.createClass
  displayName: 'DaylogEmptyPageMessage'

  render: ->
    <div className="post">
      <div className="post__content">
        <div className="post__header">
          <h1 className="post__title">
            { i18n.t('daylog_empty_page') }
          </h1>
        </div>
      </div>
    </div>

module.exports = DaylogEmptyPageMessage