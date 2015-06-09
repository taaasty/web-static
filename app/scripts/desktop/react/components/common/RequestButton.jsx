import RelationshipActionCreators from '../../actions/Relationship';

const BUTTON_SHOW_STATE = 'show',
      BUTTON_ERROR_STATE = 'error',
      BUTTON_PROCESS_STATE = 'process';

let RequestButton = React.createClass({
  propTypes: {
    objectID: React.PropTypes.number.isRequired,
    subjectID: React.PropTypes.number
  },

  getInitialState() {
    return {
      currentState: BUTTON_SHOW_STATE
    };
  },

  render() {
    return (
      <div>
        <button
            className="button button--small button--outline-light-white"
            onTouchTap={this.handleApproveClick}>
          {this.getTitle()}
        </button>
        <button
            className="button button--small button--outline-light-white button--icon"
            onTouchTap={this.handleDeclineClick}>
          <i className="icon icon--cross" />
        </button>
      </div>
    );
  },

  getTitle() {
    switch(this.state.currentState) {
      case BUTTON_ERROR_STATE: return i18n.t('follow_button_error');
      case BUTTON_PROCESS_STATE: return i18n.t('follow_button_process');
      default: return i18n.t('follow_button_approve');
    }
  },

  handleApproveClick() {
    this.setState({currentState: BUTTON_PROCESS_STATE});

    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.approve(objectID, subjectID)
      .then((relationship) => {
        this.setState({currentState: BUTTON_SHOW_STATE});
      })
      .fail(() => {
        this.setState({currentState: BUTTON_ERROR_STATE});
        this.errorTimeout = setTimeout(() => {
          this.setState({currentState: BUTTON_SHOW_STATE});
        }, 1000);
      });
  },

  handleDeclineClick() {
    this.setState({currentState: BUTTON_PROCESS_STATE});

    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.decline(objectID, subjectID)
      .then((relationship) => {
        this.setState({currentState: BUTTON_SHOW_STATE});
      })
      .fail(() => {
        this.setState({currentState: BUTTON_ERROR_STATE});
        this.errorTimeout = setTimeout(() => {
          this.setState({currentState: BUTTON_SHOW_STATE});
        }, 1000);
      });
  }
});

export default RequestButton;