# 1. Когда ссылаются на комментарий через hash #comment-123
# автоматически подгружаются все комментари и экран скроллируется на нужный
# TODO Хорошо бы подсветить этот комментарий
# 2. Когда нажимаем ответить, имя автоматически подставляется в текст сообщения,
# причем если там уже есть чье-то имя, второе подставляется через запятую.
# 3. Комментарий отправляется по нажатию ENTER, но нажав shift-ENTER или ctrl-ENTER
# можно сделать перевод строки.
# 4. Текстовое поле автоматически расширяется при вводе текста
# 5. Если остается к подгрузке 50% от загруженных комментариев - они автоматически подгружаются.
# 6. Форма комментария показываются если указали сверху (на странице поста) или если
# подгружены все комментарии по клику.

AApp.controller 'Comments', ['$scope', '$element', '$resource',
  'CommentsResource', 'Declension',
($scope, $element, $resource, CommentsResource, Declension) ->

  $scope.entryId = $element.data('id')
  commentsVisibleCount = parseInt $element.data('commentsVisibleCount')
  $scope.total = $element.data('commentsTotalCount') || 0
  $scope.visibleForm = $element.data 'showCommentsForm'

  commentsVisibleCount = $scope.total if commentsVisibleCount>0 && commentsVisibleCount*1.5>$scope.total

  $scope.newComment = ''

  $scope.showActions = false

  $scope.last_comment_id = null
  $scope.visible = commentsVisibleCount > 0
  $scope.visibleLoadMore = false
  $scope.comments = []

  $scope.visible = true if $scope.visibleForm
  $scope.initialVisible = $scope.visible

  $scope.showForm = ->
    $scope.visibleForm = true

  $scope.replyComment = (nick) ->
    $scope.showForm()

    nick = '@' + nick
    postfix = ' '
    postfix = ', ' if /^@/.exec $scope.newComment
    $scope.newComment = nick + postfix + $scope.newComment unless RegExp(nick).exec $scope.newComment
    # TODO при подобном изменении нужно дергать autoresize у окна ввода

  $scope.loadMoreTitle = ->
    if $scope.comments.length>0
      count = $scope.total - $scope.comments.length
      txt = Declension( count, [ 'оставшийся', 'оставшиеся', 'оставшихся' ] )
      title = "Загрузить #{txt} "
    else
      title = "Загрузить все "
      count = $scope.total

    title + count + " " + Declension( count, [ 'комментарий', 'комментария', 'комментариев' ] )

  $scope.$on 'toggleComments', ->
    $scope.visibleForm = true

    # Не скрывать комментарии если они изначально были показаны
    return if $scope.initialVisible && $scope.visible
    $scope.visible = ! $scope.visible

    loadComments() if $scope.visible && !$scope.last_comment_id && $scope.total>0

    console.log 'toggle Comments visible', $scope.visible

  Comments = $resource '/api/v1/comments', { entry_id: $scope.entryId },
    query:
      isArray: true
      transformResponse: (data, headers) ->
        # last_comment_id
        # since_comment_id
        # total_count
        data = JSON.parse(data)

        was_comments_count = $scope.comments.length

        $scope.total = parseInt data.total_count
        $scope.last_comment_id = data.last_comment_id

        $scope.comments = data.comments.concat $scope.comments

        $scope.visibleLoadMore = $scope.comments.length<$scope.total

        if $scope.comments.length>=$scope.total && was_comments_count>0
          $scope.visibleForm = true

        $scope.$parent.loading = false

        # Делаю так, потому что незнаю как повеситься на окончание рендера
        trigger = ->
          console.log 'trigger domChanges', $element
          $(document).trigger 'domChanged'
          $(document).trigger 'domChanged', element: $element
        setTimeout 500, trigger

        return data.comments


  $scope.submit = ->
    comment = new Comments text: $scope.newComment
    $scope.newComment = ''
    $scope.$parent.loading = true
    comment.$save (response) ->
      $scope.$parent.loading = false
      $scope.comments.push response
      $scope.total += 1

  loadComments = (limit) ->
    $scope.$parent.loading = true
    Comments.query(limit: limit, since_comment_id: $scope.last_comment_id)

  if commentsVisibleCount>0
    loadComments commentsVisibleCount

  $scope.loadMore = ->
    if $scope.comments.length < $scope.total
      loadComments $scope.total
    else
      console.log "Error. Try to load comments more then total", $scope.comments.length, $scope.total
    return false

]
