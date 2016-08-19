/*global i18n */
import React, { PropTypes } from 'react';
import Panel from './Panel';
import PersonItem from './PersonItem';
import { REL_IGNORED_STATE } from '../../actions/RelationshipActions';

function PanelIgnored(props) {
  const { cancelIgnoreTlog, ignoreTlog, relations } = props;

  function isIgnored(rel) {
    return rel.get('state') === REL_IGNORED_STATE;
  }

  function handleButtonClick(rel, relId) {
    const subjectId = rel.get('userId');

    return isIgnored(rel) ? cancelIgnoreTlog(subjectId, relId)
      : ignoreTlog(subjectId, relId);
  }

  function buttonText(rel) {
    return rel.getIn([ 'relState', 'isFetching' ]) ? i18n.t('follow_button_process')
      : !!rel.getIn([ 'relState', 'error' ]) ? i18n.t('follow_button_error')
      : isIgnored(rel) ? (
        <span>
          <span className="follow-button__title--nohover">
            {i18n.t('follow_button_ignored')}
          </span>
          <span className="follow-button__title--hover">
            {i18n.t('follow_button_unblock')}
          </span>
        </span>
      )
      : i18n.t('follow_button_block');
  }

  return (
    <Panel {...props}>
      <ul className="persons">
        {relations.map((rel, relId) => (
           <PersonItem key={`ignore-item-${relId}`} user={rel.get('user')}>
             <button
               className="follow-button"
               style={{ display: 'inline-block!important' }}
               onClick={handleButtonClick.bind(null, rel, relId)}
             >
               {buttonText(rel)}
             </button>
           </PersonItem>
         )).valueSeq()}
      </ul>
    </Panel>
  );
};

PanelIgnored.propTypes = {
  cancelIgnoreTlog: PropTypes.func.isRequired,
  ignoreTlog: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  relationsState: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default PanelIgnored;
