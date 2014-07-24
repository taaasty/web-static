###* @jsx React.DOM ###

window.PostEditor_Layout = React.createClass
  propTypes:
    backUrl:     React.PropTypes.string
    children:    React.PropTypes.renderable.isRequired
    entryType:   React.PropTypes.string
    onChangeType: React.PropTypes.func

  getDefaultProps: ->
    showChoicer:   true

  clickBack:     ->
    if @props.backUrl
      window.location.href = @props.backUrl
    else
      window.history.back()

  render: ->
    `<div className='postEditorLayout'>
      <a className="back-button" onClick={this.clickBack}></a>
        {this.props.children}
        {this.choicerComponent()}
    </div>`

  choicerComponent: ->
    if @props.changeType?
      `<PostEditorChoicer currentType={this.props.entryType} onChangeType={this.props.onChangeType}/>`

