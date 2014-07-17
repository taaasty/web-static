###* @jsx React.DOM ###

window.PostEditorLayout = React.createClass
  propTypes:
    entryId:      React.PropTypes.number.isRequired

  getInitialState: ->
    entry:       null
    previewMode: false

  componentDidMount: ->
    @loadEntry @props.entryId

  loadEntry: (entryId) ->
    $.ajax
      url:     Routes.api.entry_url(entryId)
      success: (data)=> @setState entry: data
      error:   (data)=> TastyNotifyController.errorResponse data

  handleHover: -> @setState isHover: true

  render: ->
    if @state.entry?
      `<div className='postEditorLayout'>
        <a className="arrow-back" onClick={this.clickBack}><i className="icon icon--arrow-left"></i></a>
        <section className="posts posts--edit">
          <PostActions isTlogPrivate = {this.state.entry.author.is_privacy}
                       privacy = {this.state.entry.privacy}
                       previewMode = {this.state.previewMode}
                       onChangePrivacy = {this.changePrivacy}
                       onPreview = {this.preview}/>
          <PostEditor entry={this.state.entry}/>
        </section>
      </div>`
    else
      `<div>Loading..</div>`

  changePrivacy: (value)->
    entry = @state.entry
    entry.privacy = value
    @setState entry: entry

  clickBack: -> window.history.back()
  preview:   -> @setState previewMode: !@state.previewMode

