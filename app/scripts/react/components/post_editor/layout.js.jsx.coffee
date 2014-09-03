###* @jsx React.DOM ###

window.PostEditor_Layout = React.createClass

  propTypes:
    backUrl:     React.PropTypes.string
    children:    React.PropTypes.renderable.isRequired
    #entryType:   React.PropTypes.string
    #onChangeType: React.PropTypes.func

  render: ->
    `<div className='postEditorLayout'>
        <a className="back-button" onClick={this.clickBack}></a>
        {this.props.children}
    </div>`

  clickBack: ->
    if @props.backUrl
      window.location.href = @props.backUrl
    else
      window.history.back()