import ErrorService from '../../../../shared/react/services/Error';
import EntryBrickTextType from './EntryBrickTextType';
import EntryBrickImageType from './EntryBrickImageType';
import EntryBrickVideoType from './EntryBrickVideoType';
import EntryBrickQuoteType from './EntryBrickQuoteType';
import EntryBrickUnknownType from './EntryBrickUnknownType';

const ENTRY_TEXT_TYPE = 'text',
      ENTRY_IMAGE_TYPE = 'image',
      ENTRY_VIDEO_TYPE = 'video',
      ENTRY_QUOTE_TYPE = 'quote',
      ENTRY_ANONYMOUS_TYPE = 'anonymous';

let EntryBrickContent = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired
  },

  render() {
    switch(this.props.entry.type) {
      case ENTRY_TEXT_TYPE:
      case ENTRY_ANONYMOUS_TYPE:
        return <EntryBrickTextType entry={this.props.entry} />;
      case ENTRY_IMAGE_TYPE:
        return <EntryBrickImageType entry={this.props.entry} />;
      case ENTRY_VIDEO_TYPE:
        return <EntryBrickVideoType entry={this.props.entry} />;
      case ENTRY_QUOTE_TYPE:
        return <EntryBrickQuoteType entry={this.props.entry} />;
      default:
        ErrorService.notifyError('Неизвестный тип brick-поста', {
            componentName: this.constructor.displayName,
            method: 'render',
            entryID: this.props.entry.id,
            entryType: this.props.entry.type
          });

        return <EntryBrickUnknownType entry={this.props.entry} />;
    }
  }
});

export default EntryBrickContent;