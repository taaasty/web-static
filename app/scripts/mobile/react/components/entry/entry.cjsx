TextEntry    = require './text/text'
ImageEntry   = require './image/image'
UnknownEntry = require './unknown/unknown'
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
      when TEXT_TYPE
        <TextEntry
            entry={ @props.entry }
            user={ @props.user } />
      when IMAGE_TYPE
        <ImageEntry
            entry={ @props.entry }
            user={ @props.user } />
      else
        <UnknownEntry
            entry={ @props.entry }
            user={ @props.user } />