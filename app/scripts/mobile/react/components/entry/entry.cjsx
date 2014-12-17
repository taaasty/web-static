ImageEntry = require './image/image'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'

module.exports = React.createClass
  displayName: 'Entry'

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    switch @props.entry.type
      when TEXT_TYPE  then <TextEntry entry={ @props.entry } />
      when IMAGE_TYPE then <ImageEntry entry={ @props.entry } />
      else console.warn 'Unknown type of entry', @props.type