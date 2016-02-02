EntryMetabarTags = require './tags'

window.EntryMetabar = React.createClass

  propTypes:
    userSlug:                 React.PropTypes.string.isRequired
    entryId:                  React.PropTypes.number.isRequired
    author:                   React.PropTypes.object
    isFavorited:              React.PropTypes.bool.isRequired
    isWatching:               React.PropTypes.bool.isRequired
    shouldRemoveFavoriteNode: React.PropTypes.bool
    entryUrl:                 React.PropTypes.string.isRequired
    editUrl:                  React.PropTypes.string
    successDeleteUrl:         React.PropTypes.string
    canEdit:                  React.PropTypes.bool
    canFavorite:              React.PropTypes.bool
    canWatch:                 React.PropTypes.bool
    canReport:                React.PropTypes.bool
    canDelete:                React.PropTypes.bool
    tags:                     React.PropTypes.array.isRequired
    createdAt:                React.PropTypes.string.isRequired
    entryCommentsUrl:         React.PropTypes.string.isRequired
    totalCommentsCount:       React.PropTypes.number.isRequired
    isLogged:                 React.PropTypes.bool.isRequired
    isEntryPage:              React.PropTypes.bool.isRequired

  getDefaultProps: ->
    tags: []

  render: ->
    if @props.author
      entryAuthor = <EntryMetabarAuthor user={ this.props.author } />

    unless @props.totalCommentsCount == 0 && @props.isLogged is false ||
           @props.isEntryPage is true

      entryComment = <EntryMetabarComment entryId={ this.props.entryId }
                          isLogged={ this.props.isLogged }
                          entryUrl={ this.props.entryUrl }
                          totalCommentsCount={ this.props.totalCommentsCount } />

    return <span className="meta-bar">
             { entryAuthor }
             { entryComment }

             <EntryMetabarDate time={ this.props.createdAt }
                               entryUrl={ this.props.entryUrl } />

             <EntryMetabarTags tags={this.props.tags} userSlug={this.props.userSlug} />

             <EntryMetabarDropdownMenu entryId={ this.props.entryId }
                                       isFavorited={ this.props.isFavorited}
                                       isWatching={ this.props.isWatching }
                                       shouldRemoveFavoriteNode={ this.props.shouldRemoveFavoriteNode }
                                       entryUrl={ this.props.entryUrl}
                                       editUrl={ this.props.editUrl}
                                       successDeleteUrl={ this.props.successDeleteUrl }
                                       canEdit={ this.props.canEdit }
                                       canFavorite={ this.props.canFavorite }
                                       canWatch={ this.props.canWatch }
                                       canReport={ this.props.canReport }
                                       canDelete={ this.props.canDelete } />
           </span>