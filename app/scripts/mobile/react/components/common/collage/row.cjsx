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
      <CollageRowItem image={ image } key={ image.payload.path } />  

module.exports = CollageRow