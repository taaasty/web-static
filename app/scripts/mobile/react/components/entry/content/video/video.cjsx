{ PropTypes } = React

VideoEntryContent = React.createClass
  displayName: 'VideoEntryContent'

  propTypes:
    iframely: PropTypes.object

  render: ->
    <div className="post__content">
      <div className="media-video">
        { @renderEmbedHtml() }
      </div>
    </div>

  renderEmbedHtml: ->
    if @props.iframely?.html
      <div className="media-video__embed"
           dangerouslySetInnerHTML={{ __html: @props.iframely.html }} />
    else
      <div className="media-video__embed">
        { i18n.t('entry.empty_video') }
      </div>

module.exports = VideoEntryContent

# <div class="post__content">
#   <div class="media-video" style="height: 300px;">
#     <div class="media-video__cover" style="background-image: url(http://thumbor0.tasty0.ru/kcM-pNbeipALU-UdGOBzPkSR6eI=/712x418/att/e0/4d/16553161_95149_19444900_75a8f9da-658d-499b-8c8c-28ea79350779.jpg)">
#       <div class="media-video__overlay"></div>
#     </div>
#     <div class="media-video__embed"></div>
#   </div>
# </div>