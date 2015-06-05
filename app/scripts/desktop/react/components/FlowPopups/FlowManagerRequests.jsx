import RelationshipsContainer from '../Relationships/RelationshipsContainer';

let FlowManagerRequests = React.createClass({
  render() {
    return (
      <RelationshipsContainer url={ApiRoutes.relationships_by_url('friend')}>
        <RelationshipRequestButton />
      </RelationshipsContainer>
    );
  }
});

export default FlowManagerRequests;