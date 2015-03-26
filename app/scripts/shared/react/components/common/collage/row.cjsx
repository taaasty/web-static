CollageRowItem = require './row/item'
{ PropTypes } = React

CollageRow = React.createClass
  displayName: 'CollageRow'

  propTypes:
    row: PropTypes.array.isRequired

  render: ->
    <div className="collage__row">
      { @renderRowItems() }
    </div>

  renderRowItems: ->
    @props.row.map (image) ->
      <CollageRowItem
          width={ image.width }
          height={ image.height }
          imagePath={ image.payload.path }
          imageUrl={ image.payload.url }
          progress={ image.payload.progress }
          key={ image.payload.id } />  

module.exports = CollageRow