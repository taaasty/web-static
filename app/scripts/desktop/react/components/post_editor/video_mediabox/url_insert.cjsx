window.VideoMediaBox_UrlInsert = React.createClass

  propTypes:
    embedUrl: React.PropTypes.string
    onExit:   React.PropTypes.func.isRequired
    onChange: React.PropTypes.func.isRequired

  render: ->
    <MediaBox_Layout type="video"
                     state="insert">
      <label htmlFor="media-box-video-url"
             className="media-box__form">
        <input ref="input"
               type="url"
               autoFocus={ true }
               defaultValue={ this.props.embedUrl }
               id="media-box-video-url"
               className="media-box__form-input" 
               onPaste={ this.handlePaste }
               onBlur={ this.props.onExit } />
      </label>
      <MediaBox_Actions onDelete={ this.props.onExit } />
    </MediaBox_Layout>

  handlePaste: (e) ->
    @props.onChange e.clipboardData.getData 'text/plain'