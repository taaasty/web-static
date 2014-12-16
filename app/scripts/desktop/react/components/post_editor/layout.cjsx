window.PostEditor_Layout = React.createClass

  propTypes:
    backUrl:   React.PropTypes.string
    isLoading: React.PropTypes.bool.isRequired

  render: ->
    unless @props.isLoading
      backButton = <a className="back-button"
                      onClick={ this.clickBack } />

    return <div className="postEditorLayout">
             { backButton }
             { this.props.children }
           </div>

  clickBack: ->
    if @props.backUrl
      window.location.href = @props.backUrl
    else
      window.history.back()