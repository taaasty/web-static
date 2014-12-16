window.PersonsPopup_PersonItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    user:     React.PropTypes.object.isRequired
    children: React.PropTypes.component.isRequired

  render: ->
    entriesCount = @getNumberOfEntries @props.user.public_entries_count

    return <li className="person">
             <div className="person__in">
               <div className="person__avatar">
                 <a href={ this.props.user.tlog_url }>
                   <UserAvatar
                       user={ this.props.user }
                       size={ 48 } />
                 </a>
               </div>
               <div className="person__desc">
                 <a href={ this.props.user.tlog_url }><p className="person__name">{ this.props.user.name }</p></a>
                 <div className="person__count">{ entriesCount }</div>
               </div>
               <div className="person__actions">{ this.props.children }</div>
             </div>
           </li>

  getNumberOfEntries: (number) ->
    number + ' ' + @declension(number, ['запись', 'записи', 'записей'])