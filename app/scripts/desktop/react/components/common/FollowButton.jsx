import classnames from 'classnames';
import ErrorService from '../../../../shared/react/services/Error';
import RelationshipActionCreators from '../../actions/Relationship';

const REL_FRIEND_STATE = 'friend',
      REL_REQUESTED_STATE = 'requested',
      REL_IGNORED_STATE = 'ignored',
      REL_GUESSED_STATE = 'guessed',
      REL_NONE_STATE = 'none';

const BUTTON_SHOW_STATE = 'show',
      BUTTON_ERROR_STATE = 'error',
      BUTTON_PROCESS_STATE = 'process';

let FollowButton = React.createClass({
  propTypes: {
    objectID: React.PropTypes.number.isRequired,
    subjectID: React.PropTypes.number,
    subjectPrivacy: React.PropTypes.bool,
    relState: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getInitialState() {
    return {
      currentState: BUTTON_SHOW_STATE,
      relState: this.props.relState,
      hover: false
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.relState != this.state.relState) {
      if (this.props.onChange) this.props.onChange(this.state.relState);
    }
  },

  componentWillUnmount() {
    if (this.errorTimeout) clearTimeout(this.errorTimeout);
  },

  render() {
    let buttonClasses = classnames('follow-button', {
      'state--active': this.state.relState === REL_FRIEND_STATE &&
                       this.state.currentState === BUTTON_SHOW_STATE
    });

    // Inline-block needed for prevent AdBlock social buttons hiding
    return (
      <button className={buttonClasses}
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
        if (this.state.hover) {
          switch(this.state.relState) {
            case REL_FRIEND_STATE: return i18n.t('follow_button_unsubscribe');
            case REL_REQUESTED_STATE: return i18n.t('follow_button_cancel');
            case REL_IGNORED_STATE: return i18n.t('follow_button_unblock');
            case REL_GUESSED_STATE:
            case REL_NONE_STATE: return i18n.t(this.props.subjectPrivacy ? 'follow_button_send_request' : 'follow_button_subscribe');
            default: return i18n.t('follow_button_unknown_state');
          }
        } else {
          switch(this.state.relState) {
            case REL_FRIEND_STATE: return i18n.t('follow_button_subscribed');
            case REL_REQUESTED_STATE: return i18n.t('follow_button_requested');
            case REL_IGNORED_STATE: return i18n.t('follow_button_ignored');
            case REL_GUESSED_STATE:
            case REL_NONE_STATE: return i18n.t(this.props.subjectPrivacy ? 'follow_button_send_request' : 'follow_button_subscribe');
            default: return i18n.t('follow_button_unknown_state');
          }
        }
    }
  },

  unfollow() {
    this.setState({currentState: BUTTON_PROCESS_STATE});

    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.unfollow(objectID, subjectID)
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

  follow() {
    this.setState({currentState: BUTTON_PROCESS_STATE});

    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.follow(objectID, subjectID)
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

  handleClick() {
    if (this.state.currentState === BUTTON_SHOW_STATE) {
      switch(this.state.relState) {
        case REL_FRIEND_STATE: this.unfollow(); break;
        case REL_REQUESTED_STATE:
        case REL_IGNORED_STATE: this.cancel(); break;
        case REL_GUESSED_STATE:
        case REL_NONE_STATE: this.follow(); break;
        default:
          ErrorService.notifyError('Неизвестное состояние отношений', {
            componentName: this.constructor.displayName,
            method: 'handleClick',
            relState: this.state.relState
          });
      }
    }
  },

  handleMouseEnter() {
    this.setState({hover: true});
  },

  handleMouseLeave() {
    this.setState({hover: false});
  }
});

export default FollowButton;