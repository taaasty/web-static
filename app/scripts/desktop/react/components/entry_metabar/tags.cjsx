window.EntryMetabarTags = React.createClass

  propTypes:
    tags: React.PropTypes.array.isRequired

  render: ->
    if @props.tags.length > 0
      tagList = []
      @props.tags.forEach (tag, i) =>
        unless i == @props.tags.length - 1
          tagList.push(
            <EntryMetabarTag tag={ tag } key={ i } />
            <span className="meta-item__common" key={ i + ' comma' }>, </span>
          )
        else
          tagList.push <EntryMetabarTag tag={ tag } key={ i } />

      return <span className="meta-item meta-item--tags">
               <span className="meta-item__content">{ tagList }</span>
             </span>
    else
      return <span />