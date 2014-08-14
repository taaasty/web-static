###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBarDate = React.createClass

  propTypes:
    time:      React.PropTypes.string.isRequired
    commentId: React.PropTypes.number.isRequired

  render: ->
    now = moment()
    createdAt = moment @props.time

    if now.diff(createdAt, 'seconds') < 5
      # При добавлении поста идёт небольшой рассинхрон во времени, с апи возвра-
      # щается дата на пару секунд позже текущей. Вычитаем приблизительно 5 секунд
      date = createdAt.subtract(5, 's').fromNow()
    else if now.diff(createdAt, 'minutes') < 180
      # Если комментарий оставлен менее 3 часов назад, то вид: "2 часа назад"
      date = createdAt.fromNow()
    else if now.diff(createdAt, 'days') < 1
      # Если комментарий оставлен менее суток назад, то вид: "Сегодня в 10:49"
      date = createdAt.calendar()
    else
      if now.year() != createdAt.year()
        # Если комментарий оставлен не в этом году, то вид: "9 августа 2013"
        date = createdAt.format 'D MMMM YYYY'
      else
        # Если комментарий оставлен в этом году, то вид: "9 августа"
        date = createdAt.format 'D MMMM'

    return `<a className="comment__date-link" href={ '#comment-' + this.props.commentId }>
              <span className="comment__date">{ date }</span>
            </a>`