CollageMixin = require './mixins/collage'
CollageRow   = require './row'
{ PropTypes } = React

Collage = React.createClass
  displayName: 'Collage'
  mixins: [CollageMixin]

  propTypes:
    images: PropTypes.array.isRequired
    width:  PropTypes.number.isRequired
    margin: PropTypes.number.isRequired

  render: ->
    <div className="collage">
      { @renderItems() }
    </div>

  renderItems: ->
    images = @props.images

    switch
      when images.length == 0 then []
      when images.length == 1 then <CollageRow row={ @props.images } />
      when images.length >= 2
        processedImages = @processImages images
        processedImages.map (row, i) ->
          <CollageRow row={ row } key={ i } />
      else []

module.exports = Collage