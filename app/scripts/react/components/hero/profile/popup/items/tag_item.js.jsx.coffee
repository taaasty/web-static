###* @jsx React.DOM ###

window.HeroProfileStats_TagItem = React.createClass

  propTypes:
    tag: React.PropTypes.object.isRequired

  render: ->
   `<article className="tag">
      <a href={ Routes.tag_path(this.props.tag.name) }
         title={ '#' + this.props.tag.name }
         className="tag__link">
        <span className="tag__count">{ this.props.tag.taggings_count }</span>
        <span className="tag__text">{ '#' + this.props.tag.name }</span>
      </a>
    </article>`

