###* @jsx React.DOM ###

window.FeedTlog = React.createClass
  mixins: [FeedBaseMixin]

  propTypes:
    feedHtml:          React.PropTypes.string
    isLoadingNew:      React.PropTypes.bool
    isLoadingPrevious: React.PropTypes.bool

  render: ->
    if @props.isLoadingPrevious
      spinnerAfter = `<div className="page-loader"><Spinner size={ 24 } /></div>`
    
    if @props.isLoadingNew
      spinnerBefore = `<div className="page-loader"><Spinner size={ 24 } /></div>`

    return `<div className="content-area">
              <div className="content-area__bg" />
              <div className="content-area__inner">
                { spinnerBefore }
                <section ref="container"
                         className="posts"
                         dangerouslySetInnerHTML={{__html: this.props.feedHtml}}>
                </section>
                { spinnerAfter }
              </div>
            </div>`