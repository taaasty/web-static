Hero           = require '../components/hero/hero'
Entry          = require '../components/entry/entry'
Pagination     = require '../components/pagination/pagination'
PageMixin      = require './mixins/page'
{ PropTypes } = React

window.EntryPage = React.createClass
  mixins: [PageMixin]

  propTypes:
    type:    PropTypes.string.isRequired
    appData: PropTypes.object.isRequired

  getDefaultProps: ->
    type: 'text'

  render: ->
    userSlug = @props.appData.entities.user?.slug
    heroData = @props.appData.hero

    return <div>
              <FeedToolbar userSlug={ userSlug } />
              <UserToolbar userSlug={ userSlug } />
              <div className="layout">
                <div className="layout__header">
                  <Hero user={ heroData.user }
                        stats={ heroData.stats }
                        relationship={ heroData.relationship } />
                </div>
                <div className="layout__body">
                  <Entry />
                  <Pagination />
                </div>
              </div>
            </div>