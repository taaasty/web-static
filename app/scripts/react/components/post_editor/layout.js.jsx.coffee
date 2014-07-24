###* @jsx React.DOM ###

DEMO_IDS=
  text:  18971012
  video: 18970969
  image: 18971001
  quote: 18971004

window.PostEditor_Layout = React.createClass
  mixins:         [ReactActivitiesMixin]
  propTypes:
    entryId:    React.PropTypes.number.isRequired
    entryType:  React.PropTypes.string
    backUrl:    React.PropTypes.string

  getDefaultProps: ->
    entryType:    'text'
    defaultPrivacy: 'public'

  getInitialState: ->
    isTlogPrivate:  false # <PostActions isTlogPrivate = {this.state.entry.author.is_privacy}
    entry:       null
    type:        @props.entryType
    previewMode: false

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

  handleHover: -> @setState isHover: true

  goToEntryPage: (newEntry) ->
    if window.TASTY_ENV=='development'
      alert "Статья успешно сохранена"
      window.location.reload()
    else
      _.defer =>
        console.log 'goto', newEntry.entry_url
        window.location.href = newEntry.entry_url

  render: ->

    if @state.entry?
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
      actions = PostActions
        privacy:         @state.entry.privacy
        isTlogPrivate:   @props.isTlogPrivate
        previewMode:     @state.previewMode
        onChangePrivacy: @changePrivacy
        onPreview:       @togglePreview
        isLoading:       @hasActivities()
        onSave:          @saveEntry
    else
      editor = `<div>Loading..</div>`
      actions = PostActions
        privacy:         @props.defaultPrivacy
        isTlogPrivate:   @props.isTlogPrivate
        previewMode:     false
        onChangePrivacy: @changePrivacy
        onPreview:       @togglePreview
        onSave:          @saveEntry
        isLoading:       true

    `<div className='postEditorLayout'>
      <a className="back-button" onClick={this.clickBack}></a>
      <section className="posts posts--edit">
        {actions}
        {editor}
        <PostEditorChoicer currentType={this.state.type} onChangeType={this.changeType}/>
      </section>
    </div>`

  saveEntry: ->
    return unless @state.entry? && @refs.editor?
    @refs.editor.saveEntry()

  changeType: (type) ->
    @loadEntry IDS[type]

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

