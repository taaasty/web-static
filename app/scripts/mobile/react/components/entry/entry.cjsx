ImageEntry = require './image/image'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'

module.exports = React.createClass
  displayName: 'Entry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    switch @props.entry.type
      when TEXT_TYPE  then <TextEntry entry={ @props.entry } />
      when IMAGE_TYPE then <ImageEntry
                               entry={ @props.entry }
                               user={ @props.user } />
      else console.warn 'Unknown type of entry', @props.entry.type