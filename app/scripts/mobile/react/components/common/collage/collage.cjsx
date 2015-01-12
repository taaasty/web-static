CollageMixin = require './mixins/collage'
CollageRow   = require './row'
{ PropTypes } = React

Collage = React.createClass
  displayName: 'Collage'
  mixins: [CollageMixin]

  propTypes:
    images:       PropTypes.array.isRequired
    width:        PropTypes.number.isRequired
    margin:       PropTypes.number.isRequired
    minRowHeight: PropTypes.number.isRequired

  render: ->
    <div className="collage">
      { @renderItems() }
    </div>

  renderItems: ->
    images = @props.images

    switch
      when images.length == 0 then []
      when images.length == 1
        rows = @makeRows images
        <CollageRow row={ rows[0] } />
      when images.length >= 2
        rows = @makeRows images
        rows.map (row, i) ->
          <CollageRow row={ row } key={ i } />
      else []

module.exports = Collage