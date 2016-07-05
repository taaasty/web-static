import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import Scroller from '../common/Scroller';

function FlowFormChooserResults({ onResultClick, results, selected }) {
  function renderList() {
    return results.map((tlog, i) => {
      const resultClasses = classNames('flow-form__chooser-result', {
        'state--active': i === selected,
      });

      return (
        <div
          className={resultClasses}
          key={tlog.get('id')}
          onTouchTap={onResultClick.bind(null, tlog)}
        >
          <div className="flow-form__user">
            <div className="flow-form__user-avatar">
              <Avatar size={35} userpic={tlog.get('userpic').toJS()} />
            </div>
            <div className="flow-form__user-name">
              {tlog.get('slug')}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <Scroller>
      <div className="flow-form__chooser-results">
        {renderList()}
      </div>
    </Scroller>
  );
}

FlowFormChooserResults.propTypes = {
  onResultClick: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
};

export default FlowFormChooserResults;
