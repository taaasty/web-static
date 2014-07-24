###* @jsx React.DOM ###

window.PostEditor_EditPost = React.createClass
  mixins:         [PostEditor_LayoutMixin, ReactActivitiesMixin]

  propTypes:
    entry:        React.PropTypes.object.isRequired
    onChangeType: React.PropTypes.func

  getInitialState: ->
    @stateFromProps @props

  componentWillReceiveProps: (nextProps) ->
    @setState @stateFromProps(nextProps)

  stateFromProps: (props) ->
    entryPrivacy: props.entry?.privacy || 'public'
    entryType:    props.entry?.type || 'text'
    entry:        props.entry
