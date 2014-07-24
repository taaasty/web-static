###* @jsx React.DOM ###

window.PostEditor_LayoutEdit = React.createClass
  mixins:         [ReactActivitiesMixin]
  propTypes:
    isTlogPrivate: React.PropTypes.bool.isRequired
    entry:         React.PropTypes.object
    backUrl:       React.PropTypes.string

  getInitialState: ->
    entry:         @props.entry
    previewMode:   false
    isGoing:       false

  goToEntryPage: (newEntry) ->
    if window.TASTY_ENV=='development'
      alert "Статья успешно сохранена"
      window.location.reload()
    else
      @setState isGoing: true
      _.defer =>
        TastyNotifyController.notifySuccess 'Опубликовано! Переходим на страницу поста..'
        console.log 'goto', newEntry.entry_url
        window.location.href = newEntry.entry_url

  render: ->
    opts =  ref: 'editor', entry: @state.entry, activitiesHandler: @activitiesHandler, doneCallback: @goToEntryPage
    switch @state.entry.type
      when 'text'
        editor = PostEditor_TextEditor  opts
      when 'image'
        editor = PostEditor_ImageEditor opts
      when 'video'
        editor = PostEditor_VideoEditor opts
      when 'quote'
        editor = PostEditor_QuoteEditor opts
      else
        console.error "Unknown entry type: #{@state.entry.type}"

    `<div className='postEditorLayout'>
      <a className="back-button" onClick={this.clickBack}></a>
      <section className="posts posts--edit">
        <PostActions privacy={this.state.entry.privacy}
                     isTlogPrivate={this.props.isTlogPrivate}
                     previewMode={this.state.previewMode}
                     onChangePrivacy={this.changePrivacy}
                     onPreview={this.togglePreview}
                     isLoading={this.hasActivities() || this.state.isGoing}
                     onSave={this.saveEntry}
        />
        {editor}
      </section>
    </div>`

    # <PostEditorChoicer currentType={this.state.entry.type} onChangeType={this.changeType}/>
    # 

  saveEntry: ->
    return unless @state.entry? && @refs.editor?
    @refs.editor.saveEntry()

  changeType: (type) ->
    console.log 'change type'
    #@loadEntry IDS[type]

  changePrivacy: (value)->
    entry = @state.entry
    entry.privacy = value
    @setState entry: entry

  clickBack:     ->
    if @props.backUrl
      window.location.href = @props.backUrl
    else
      window.history.back()

  togglePreview: ->
    @setState previewMode: !@state.previewMode

DEMO_IDS=
  text:  18971012
  video: 18970969
  image: 18971001
  quote: 18971004

window.PostEditor_LayoutLoading = React.createClass
  mixins:         [ReactActivitiesMixin]
  propTypes:
    entryId:    React.PropTypes.number.isRequired
    entryType:  React.PropTypes.string
    backUrl:    React.PropTypes.string

  getDefaultProps: ->
    entryType:    'text'
    defaultPrivacy: 'public'

  componentDidMount: ->
    if window.TASTY_ENV=='development'
      entryId = DEMO_IDS[@state.type]
    else
      entryId = @props.entryId
    @loadEntry entryId #@props.entryId

  loadEntry: (entryId) ->
    @incrementActivities()
    @setState entry: null
    $.ajax
      url:     Routes.api.entry_url(entryId)
      success: (data) =>
        @setState entry: data, type: data.type
      error:   (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()


  render: ->
    editor = `<div>Loading..</div>`
    actions = PostActions
      privacy:         @props.entry.privacy
      isTlogPrivate:   @props.isTlogPrivate
      previewMode:     false
      onChangePrivacy: @changePrivacy
      onPreview:       @togglePreview
      onSave:          @saveEntry
      isLoading:       true



