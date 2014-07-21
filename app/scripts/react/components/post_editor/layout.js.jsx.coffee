###* @jsx React.DOM ###

IDS=
  text:  18971012
  video: 18970969
  image: 18971001
  quote: 18971004

window.PostEditor_Layout = React.createClass
  propTypes:
    entryId:      React.PropTypes.number.isRequired
    defaultType:  React.PropTypes.string

  getDefaultProps: ->
    defaultType: 'text'
    defaultPrivacy: 'public'

  getInitialState: ->
    isTlogPrivate:  false # <PostActions isTlogPrivate = {this.state.entry.author.is_privacy}
    entry:       null
    type:        @props.defaultType
    previewMode: false
    isLoading:   false

  componentDidMount: ->
    entryId = IDS[@state.type]
    @loadEntry entryId #@props.entryId

  loadEntry: (entryId) ->
    @setState entry: null
    $.ajax
      url:     Routes.api.entry_url(entryId)
      success: (data) =>
        @setState entry: data, type: data.type
      error:   (data) =>
        TastyNotifyController.errorResponse data

  handleHover: -> @setState isHover: true

  render: ->
    if @state.entry?
      switch @state.entry.type
        when 'text'
          editor = PostEditor_TextEditor entry: @state.entry, isLoading: @state.isLoading, setLoading: @setLoading
        when 'image'
          editor = PostEditor_ImageEditor entry: @state.entry, isLoading: @state.isLoading, setLoading: @setLoading
        when 'video'
          editor = PostEditor_VideoEditor entry: @state.entry, isLoading: @state.isLoading, setLoading: @setLoading
        when 'quote'
          editor = PostEditor_QuoteEditor entry: @state.entry, isLoading: @state.isLoading, setLoading: @setLoading
        else
          console.error "Unknown entry type: #{@state.entry.type}"
      actions = PostActions
        privacy: @state.entry.privacy
        isTlogPrivate: @props.isTlogPrivate
        previewMode: false
        onChangePrivacy: @changePrivacy
        onPreview: @togglePreview
        isLoading: @state.isLoading
    else
      editor = `<div>Loading</div>`
      actions = PostActions
        privacy:       @props.defaultPrivacy
        isTlogPrivate: @props.isTlogPrivate
        previewMode: @state.previewMode
        onChangePrivacy: @changePrivacy
        onPreview: @togglePreview
        isLoading: true

    `<div className='postEditorLayout'>
      <a className="back-button" onClick={this.clickBack}></a>
      <section className="posts posts--edit">
        {actions}
        {editor}
        <PostEditorChoicer currentType={this.state.type} onChangeType={this.changeType}/>
      </section>
    </div>`

  changeType: (type) ->
    @loadEntry IDS[type]

  changePrivacy: (value)->
    entry = @state.entry
    entry.privacy = value
    @setState entry: entry

  clickBack:     -> window.history.back()

  setLoading: (isLoading) -> @setState isLoading: isLoading
  togglePreview: -> @setState previewMode: !@state.previewMode

