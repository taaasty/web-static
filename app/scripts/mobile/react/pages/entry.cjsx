FeedToolbar    = require '../components/toolbars/feed'
UserToolbar    = require '../components/toolbars/user'
Hero           = require '../components/hero/hero'
Entry          = require '../components/entry/entry'
Pagination     = require '../components/pagination/pagination'
PageMixin      = require './mixins/page'
{ PropTypes } = React

window.EntryPage = React.createClass
  displayName: 'EntryPage'
  mixins: [PageMixin]

  propTypes:
    appData: PropTypes.object.isRequired

  render: ->
    userSlug = @props.appData.entities.user?.slug
    entry    = @props.appData.entry
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
                 <Entry entry={ entry } />
                 <Pagination />
               </div>
             </div>
           </div>