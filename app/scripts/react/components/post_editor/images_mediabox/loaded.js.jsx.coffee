###* @jsx React.DOM ###

window.ImagesMediaBox_Loaded = React.createClass
  propTypes:
    images:   React.PropTypes.array.isRequired
    onDelete: React.PropTypes.func.isRequired
    activitiesHandler: React.PropTypes.object

  shouldComponentUpdate: (nextProps, nextState) ->
    return true unless nextProps.onDelete == @props.onDelete
    not ReactUtils.isImagesEqual nextProps.images, @props.images

  render: ->
    `<div className="media-box__display">
       <ImagesCollage images={this.props.images} activitiesHandler={this.props.activitiesHandler} />
       <MediaBox_Actions onDelete={this.props.onDelete} />
     </div>`
