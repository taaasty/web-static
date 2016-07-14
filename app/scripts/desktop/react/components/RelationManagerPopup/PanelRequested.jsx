/*global i18n */
import React, { PropTypes } from 'react';
import Panel from './Panel';
import PersonItem from './PersonItem';

function PanelRequested(props) {
  const { approveTlog, declineTlog, relations } = props;

  function buttonText(state) {
    return state.get('isFetching') ? i18n.t('follow_button_process')
      : !!state.get('error') ? i18n.t('follow_button_error')
      : i18n.t('follow_button_approve');
  }

  return (
    <Panel {...props}>
      <ul className="persons">
        {relations.map((rel, relId) => (
           <PersonItem key={`request-item-${relId}`} user={rel.get('reader')}>
             <div>
               <button
                 className="button button--small button--outline-light-white"
                 onClick={approveTlog.bind(null, rel.get('readerId'), relId)}
               >
                 {buttonText(rel.get('relState'))}
               </button>
               <button
                 className="button button--small button--outline-light-white button--icon"
                 onClick={declineTlog.bind(null, rel.get('readerId'), relId)}
               >
                 <i className="icon icon--cross" />
               </button>
             </div>
           </PersonItem>
         )).valueSeq()}
      </ul>
    </Panel>
  );
}

PanelRequested.propTypes = {
  approveTlog: PropTypes.func.isRequired,
  declineTlog: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  relationsState: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default PanelRequested;
