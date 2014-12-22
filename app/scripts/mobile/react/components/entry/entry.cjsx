TextEntry    = require './text/text'
ImageEntry   = require './image/image'
VideoEntry   = require './video/video'
UnknownEntry = require './unknown/unknown'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'

Entry = React.createClass
  displayName: 'Entry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    Entry = switch @props.entry.type
      when TEXT_TYPE  then TextEntry
      when IMAGE_TYPE then ImageEntry
      when VIDEO_TYPE then VideoEntry
      else UnknownEntry

    return <Entry
               entry={ @props.entry }
               user={ @props.user } />

module.exports = Entry