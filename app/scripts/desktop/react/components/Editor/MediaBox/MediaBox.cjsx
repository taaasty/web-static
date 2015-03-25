{ PropTypes } = React

EditorMediaBox = React.createClass
  displayName: 'EditorMediaBox'

  propTypes:
    state: PropTypes.string
    entryType: PropTypes.string.isRequired
    children: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired

  getDefaultProps: ->
    # loaded: - когда есть картинки
    # - form, info: hidden
    # - actions, display: show
    #
    # insert: - режим с формой для вставки
    # - actions, form: show
    # - info, action_rotate: hidden
    #
    # hidden: - все скрыто (не используется)
    # - all hidden
    #
    # drag-hover
    # - special border color
    #
    # null - по -умолчанию
    # - display, actions: hidden
    # - form, info: show
    state: null

  render: ->
    mediaBoxClasses = ['media-box']
    mediaBoxClasses.push('state--' + @props.state) if @props.state?

    return <figure className={ @props.entryType }>
             <div className={ mediaBoxClasses.join(' ') }>
               { @props.children }
             </div>
           </figure>

module.exports = EditorMediaBox