CurrentUserMixin = require '../../mixins/currentUser'
TextEntry        = require './text/text'
ImageEntry       = require './image/image'
VideoEntry       = require './video/video'
QuoteEntry       = require './quote/quote'
UnknownEntry     = require './unknown/unknown'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'
QUOTE_TYPE = 'quote'

Entry = React.createClass
  displayName: 'Entry'
  mixins: [CurrentUserMixin]

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    Entry = switch @props.entry.type
      when TEXT_TYPE  then TextEntry
      when IMAGE_TYPE then ImageEntry
      when VIDEO_TYPE then VideoEntry
      when QUOTE_TYPE then QuoteEntry
      else UnknownEntry

    return <Entry entry={ @props.entry }
                  user={ @state.user } />

module.exports = Entry