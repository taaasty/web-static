FADE_DURATION = 300
START_TIMEOUT = 3000

window.TastyLockingAlert = React.createClass

  propTypes:
    title:   React.PropTypes.string
    message: React.PropTypes.string.isRequired
    action:  React.PropTypes.func.isRequired

  componentDidMount: ->
    @open()

    setTimeout (=>
      @props.action()
    ), START_TIMEOUT

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
                     <Spinner size={ 30 } />
                   </div>
                 </div>
               </div>
             </div>
           </div>

  open: -> $(@getDOMNode()).css('display', 'none').fadeIn FADE_DURATION