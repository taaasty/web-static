###* @jsx React.DOM ###

window.EntryMetabar = React.createClass

  propTypes:
    entryId:                  React.PropTypes.number.isRequired
    isFavorited:              React.PropTypes.bool.isRequired
    isWatching:               React.PropTypes.bool.isRequired
    shouldRemoveFavoriteNode: React.PropTypes.bool
    entryUrl:                 React.PropTypes.string.isRequired
    editUrl:                  React.PropTypes.string.isRequired
    successDeleteUrl:         React.PropTypes.string
    canEdit:                  React.PropTypes.bool.isRequired
    canFavorite:              React.PropTypes.bool.isRequired
    canWatch:                 React.PropTypes.bool.isRequired
    canReport:                React.PropTypes.bool.isRequired
    canDelete:                React.PropTypes.bool.isRequired
    tags:                     React.PropTypes.array.isRequired
    createdAt:                React.PropTypes.string.isRequired
    entryCommentsUrl:         React.PropTypes.string.isRequired

  getDefaultProps: ->
    tags: []

  render: ->
   `<span className="meta-bar">
      <EntryMetabarComment entryId={ this.props.entryId } />
      <EntryMetabarDate time={ this.props.createdAt }
                        entryUrl={ this.props.entryUrl } />
      <EntryMetabarTags tags={ this.props.tags } />
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
    </span>`