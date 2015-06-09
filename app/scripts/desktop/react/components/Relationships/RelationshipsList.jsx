import RelationshipsListItem from './RelationshipsListItem';

let RelationshipsList = React.createClass({
  propTypes: {
    relationships: React.PropTypes.array.isRequired,
    actions: React.PropTypes.array
  },

  render() {
    if (this.props.relationships.length) {
      let relationshipList = this.props.relationships.map((item) => {
        return (
          <RelationshipsListItem relationship={item} key={item.id}>
            {React.Children.map(this.props.children, this.renderAction.bind(this, item))}
          </RelationshipsListItem>
        );
      });

      return (
        <ul className="persons">
          {relationshipList}
        </ul>
      );
    } else {
      return (
        <div className="grid-full">
          <div className="grid-full__middle">
            <div className="popup__text">
              Список пуст
            </div>
          </div>
        </div>
      );
    }
  },

  renderAction(relationship, action) {
    let subject = relationship.reader || relationship.user;

    return React.cloneElement(action, {
      relState: relationship.state,
      subjectID: subject.id,
      subjectPrivacy: subject.is_privacy,
      key: relationship.id
    });
  }
});

export default RelationshipsList;