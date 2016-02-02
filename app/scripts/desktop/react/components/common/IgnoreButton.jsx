import RelationshipActionCreators from '../../actions/Relationship';

const BUTTON_SHOW_STATE = 'show',
      BUTTON_ERROR_STATE = 'error',
      BUTTON_PROCESS_STATE = 'process';

let IgnoreButton = React.createClass({
  propTypes: {
    objectID: React.PropTypes.number.isRequired,
    subjectID: React.PropTypes.number,
    relState: React.PropTypes.string
  },

  getInitialState() {
    return {
      currentState: BUTTON_SHOW_STATE,
      relState: this.props.relState,
      hover: false
    };
  },

  render() {
    return (
      <button className="follow-button"
              style={{display: 'inline-block!important'}}
              onTouchTap={this.handleClick}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}>
        {this.getTitle()}
      </button>
    );
  },

  getTitle() {
    switch(this.state.currentState) {
      case BUTTON_ERROR_STATE: return i18n.t('follow_button_error');
      case BUTTON_PROCESS_STATE: return i18n.t('follow_button_process');
      default:
        if (this.state.relState === 'ignored') {
          return this.state.hover ? i18n.t('follow_button_unblock') : i18n.t('follow_button_ignored');
        } else {
          return i18n.t('follow_button_block');
        }
    }
  },

  cancel() {
    this.setState({currentState: BUTTON_PROCESS_STATE});

    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.cancel(objectID, subjectID)
      .then((relationship) => {
        this.setState({
          currentState: BUTTON_SHOW_STATE,
          relState: relationship.state
        });
      })
      .fail(() => {
        this.setState({currentState: BUTTON_ERROR_STATE});
        this.errorTimeout = setTimeout(() => {
          this.setState({currentState: BUTTON_SHOW_STATE});
        }, 1000);
      });
  },

  ignore() {
    this.setState({currentState: BUTTON_PROCESS_STATE});

    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.ignore(objectID, subjectID)
      .then((relationship) => {
        this.setState({
          currentState: BUTTON_SHOW_STATE,
          relState: relationship.state
        });
      })
      .fail(() => {
        this.setState({currentState: BUTTON_ERROR_STATE});
        this.errorTimeout = setTimeout(() => {
          this.setState({currentState: BUTTON_SHOW_STATE});
        }, 1000);
      });
  },

  handleClick() {
    if (this.state.currentState === BUTTON_SHOW_STATE) {
      return this.state.relState === 'ignored' ? this.cancel() : this.ignore();
    }
  },

  handleMouseEnter() {
    this.setState({hover: true});
  },

  handleMouseLeave() {
    this.setState({hover: false});
  }
});

export default IgnoreButton;