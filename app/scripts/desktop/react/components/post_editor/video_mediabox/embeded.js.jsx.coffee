###* @jsx React.DOM ###

window.VideoMediaBox_Embeded = React.createClass

  propTypes:
    embedHtml: React.PropTypes.string.isRequired
    onDelete:  React.PropTypes.func.isRequired

  render: ->
   `<MediaBox_Layout type="video" state="loaded">
      <div className="media-box__display"
           dangerouslySetInnerHTML={{ __html: this.props.embedHtml }} />
      <MediaBox_Actions onDelete={ this.props.onDelete }/>
    </MediaBox_Layout>`