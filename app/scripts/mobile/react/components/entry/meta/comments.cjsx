Fluxxor         = require 'fluxxor'
FluxMixin       = Fluxxor.FluxMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin
{ PropTypes } = React

EntryMetaComments = React.createClass
  displayName: 'EntryMetaComments'
  mixins: [StoreWatchMixin('CommentsStore'), FluxMixin]

  propTypes:
    flux:          PropTypes.object.isRequired
    commentsCount: PropTypes.number.isRequired

  render: ->
    <div className="meta-comments">
      { @state.commentsCount }
    </div>

  getStateFromFlux: ->
    commentsCount: @getFlux().store('CommentsStore').getTotalCount()

module.exports = EntryMetaComments