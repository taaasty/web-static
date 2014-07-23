###* @jsx React.DOM ###

window.VideoMediaBox_Insert = React.createClass
  propTypes:
    embedUrl: React.PropTypes.string
    onClean: React.PropTypes.func.isRequired
    onInsert: React.PropTypes.func.isRequired

  componentDidMount: ->
    $input = $ @refs.input.getDOMNode()

    $input.focus()

  render: ->
    `<MediaBox_Layout type='video' state='insert'>
       <label className="media-box__form" htmlFor="media-box-video-url">
         <input id="media-box-video-url" className="media-box__form-input" 
                type="url" ref="input" onPaste={this.onPaste} onKeyUp={this.onKeyUp}
                defaultValue={this.props.embedUrl} />
       </label>
       <MediaBox_Actions onDelete={this.props.onClean}/>
     </MediaBox_Layout>`

  #onKeyUp: (event) ->
    #debugger

  onPaste: (event) ->
    @props.onInsert  event.nativeEvent.clipboardData.getData('text/plain')

  embedUrl: ->
    @refs.input.getDOMNode().value
