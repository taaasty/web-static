###* @jsx React.DOM ###
#
window.MediaBox_Layout = React.createClass
  mixins: [React.addons.PureRenderMixin]
  propTypes:
    children: React.PropTypes.renderable.isRequired

    # null, insert, loaded, hidden, drag-hover
    state:    React.PropTypes.string
    type:     React.PropTypes.string.isRequired

  getDefaultProps: ->
    state: null

  render: ->
    classes = 'media-box': true

    classes["state--#{@props.state}"]=true if @props.state?

    cx = React.addons.classSet classes

    `<figure className={this.props.type}><div className={cx} ref='dropZone'>{this.props.children}</div></figure>`
