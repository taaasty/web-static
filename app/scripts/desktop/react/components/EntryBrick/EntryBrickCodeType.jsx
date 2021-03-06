import React, { PropTypes } from 'react';
import Text from '../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickCodeType(props) {
  const {
    entry,
    entryAuthor,
    entryTlog,
    hasModeration,
    hostTlogId,
    onEntryAccept,
    onEntryDecline,
  } = props;
  const id = entry.get('id');
  const url = entry.get('url', entry.get('entryUrl'));
  const title = entry.get('title');

  function renderBrickTitle() {
    return (
      <Link
        className="brick__link"
        title={title}
        to={{ pathname: uri(url).path(), state: { id }}}
      >
        <h2 className="brick__title">
          {title}
        </h2>
      </Link>
    );
  }

  function renderContents() {
    return (
      <Link
        className="brick__link"
        title={title}
        to={{ pathname: uri(url).path(), state: { id }}}
      >
        <pre>
          <Text value={entry.get('textTruncated')} withHTML />
        </pre>
      </Link>
    );
  }

  return (
    <span>
      <div className="brick__body">
        {title && renderBrickTitle()}
        <div className="brick__text">
          {renderContents()}
        </div>
      </div>
      <div className="brick__meta">
        <EntryBrickMetabar
          entry={entry}
          entryAuthor={entryAuthor}
          entryTlog={entryTlog}
          hostTlogId={hostTlogId}
        />
      </div>
      <EntryBrickActions
        hasModeration={hasModeration}
        onAccept={onEntryAccept}
        onDecline={onEntryDecline}
      />
    </span>
  );
}

EntryBrickCodeType.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickCodeType;
