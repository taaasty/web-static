###* @jsx React.DOM ###

window.PostEditorLayout = React.createClass
  propTypes:
    isTlogPrivate: React.PropTypes.bool.isRequired
    entryId:       React.PropTypes.number
    privacy:       React.PropTypes.string

  getDefaultProps: ->
    isTlogPrivate: false
    privacy: 'public'

  getInitialState: ->
    privacy: @props.privacy
    previewMode: false

  changePrivacy: (value)->
    @setState privacy: value

  clickBack: ->
    window.history.back()

  preview: ->
    @setState previewMode: !@state.previewMode

  render: ->
    `<div className='postEditorLayout'>
      <a className="arrow-back" onClick={this.clickBack}><i className="icon icon--arrow-left"></i></a>
      <section className="posts posts--edit">
        <PostActions isTlogPrivate = {this.props.isTlogPrivate}
                     privacy = {this.state.privacy}
                     previewMode = {this.state.previewMode}
                     onChangePrivacy = {this.changePrivacy}
                     onPreview = {this.preview}/>
        <PostEditor />
      </section>
    </div>`
