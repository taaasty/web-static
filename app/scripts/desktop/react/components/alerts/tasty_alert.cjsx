FADE_DURATION = 300

window.TastyAlert = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    title:       React.PropTypes.string
    message:     React.PropTypes.string.isRequired
    buttonText:  React.PropTypes.string
    buttonColor: React.PropTypes.string
    onAccept:    React.PropTypes.func

  getDefaultProps: ->
    buttonText:  'OK'
    buttonColor: 'red'

  componentDidMount: ->
    @open()

    $('body').addClass 'no-scroll confirmation-enabled'

  componentWillUnmount: ->
    $('body').removeClass 'no-scroll confirmation-enabled'

  render: ->
    if @props.title
      title = <b>{ this.props.title }</b>

    return <div className="confirmation">
             <div className="confirmation__main">
               <div className="confirmation__cell">
                 <div className="confirmation__box">
                   { title }
                   <div dangerouslySetInnerHTML={{__html: this.props.message || ''}}
                        className="confirmation__text" />
                   <div className="confirmation__buttons">
                     <button onClick={ this.onAccept }
                             className={ "button button--" + this.props.buttonColor + " button--small" }>
                       { this.props.buttonText }
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </div>

  open: -> $(@getDOMNode()).css('display', 'none').fadeIn FADE_DURATION

  close: -> $(@getDOMNode()).fadeOut FADE_DURATION, @unmount

  onAccept: ->
    @close()
    @props.onAccept() if @props.onAccept?