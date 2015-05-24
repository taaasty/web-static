import EntryBrickContent from './EntryBrickContent';

const ENTRY_TEXT_TYPE = 'text',
      ENTRY_IMAGE_TYPE = 'image',
      ENTRY_VIDEO_TYPE = 'video',
      ENTRY_QUOTE_TYPE = 'quote';

let EntryBrick = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <article className={this.getBrickClasses()}>
        <EntryBrickContent entry={this.props.entry} />
      </article>
    );
  },

  getBrickClasses() {
    let typeClass;

    switch(this.props.entry.type) {
      case ENTRY_TEXT_TYPE: typeClass = 'text'; break;
      case ENTRY_IMAGE_TYPE: typeClass = 'image'; break;
      case ENTRY_VIDEO_TYPE: typeClass = 'video'; break;
      case ENTRY_QUOTE_TYPE: typeClass = 'quote'; break;
      default: typeClass = 'text';
    }

    return `brick brick--${typeClass}`;
  }
});

export default EntryBrick;