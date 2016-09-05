import React, { PropTypes } from 'react';
import Panel from './Panel';
import PersonItem from './PersonItem';
import RelationButton from '../RelationButton';

function PanelSocial(props) {
  const { relations, subscribeAll, subscribeAllButtonText, totalCount } = props;

  return (
    <Panel {...props}>
      <div className="persons-headline">
        {relations.count() > 1 && (
           <div className="persons-headline__right">
             <button className="manage-persons-button" onClick={subscribeAll}>
               {subscribeAllButtonText}
             </button>
           </div>
        )}
        <div className="persons-headline__left">
          {i18n.t('suggestions_found', { count: totalCount })}
        </div>
      </div>
      <ul className="persons">
        {relations.map((rel, relId) => (
           <PersonItem key={`social-item-${relId}`} user={rel.get('user')}>
             <RelationButton relId={relId} />
           </PersonItem>
         )).valueSeq()}
      </ul>
    </Panel>
  );
}

PanelSocial.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  relations: PropTypes.object.isRequired,
  subscribeAll: PropTypes.func.isRequired,
  subscribeAllButtonText: PropTypes.string.isRequired,
  totalCount: PropTypes.number,
};

export default PanelSocial;
