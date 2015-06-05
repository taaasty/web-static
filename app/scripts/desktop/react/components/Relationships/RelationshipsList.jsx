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
            {this.props.actions.map(this.renderAction.bind(null, item))}
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
    return React.cloneElement(action, {
      relationship,
      key: relationship.id
    });
  }
});

export default RelationshipsList;