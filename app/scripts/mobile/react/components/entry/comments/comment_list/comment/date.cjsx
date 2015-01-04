{ PropTypes } = React

CommentDate = React.createClass
  displayName: 'CommentDate'

  propTypes:
    date:      PropTypes.string.isRequired
    entryUrl:  PropTypes.string.isRequired
    commentId: PropTypes.number.isRequired

  render: ->
    <a href={ @getCommentUrl() }
       className="comment__date">
      { @getFormattedDate() }
    </a>

  getCommentUrl: ->
    @props.entryUrl + '#comment-' + @props.commentId

  getFormattedDate: ->
    now = moment()
    createdAt = moment @props.date

    switch
      when now.diff(createdAt, 'seconds') < 5
        # При добавлении поста идёт небольшой рассинхрон во времени, с апи возвра-
        # щается дата на пару секунд позже текущей. Вычитаем приблизительно 5 секунд
        createdAt.subtract(5, 's').fromNow()
      when now.diff(createdAt, 'minutes') < 180
        # Если комментарий оставлен менее 3 часов назад, то вид: "2 часа назад"
        createdAt.fromNow()
      when now.diff(createdAt, 'days') < 1
        # Если комментарий оставлен менее суток назад, то вид: "Сегодня в 10:49"
        createdAt.calendar()
      else
        if now.year() != createdAt.year()
          # Если комментарий оставлен не в этом году, то вид: "9 августа 2013"
          createdAt.format 'D MMMM YYYY'
        else
          # Если комментарий оставлен в этом году, то вид: "9 августа"
          createdAt.format 'D MMMM'

module.exports = CommentDate