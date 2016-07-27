import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class EditorVoteButton extends Component {
  componentDidMount() {
    const $button = $(this.refs.container);
    $button.tooltip({ placement: 'bottom' });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.enabled != this.props.enabled) {
      const $button = $(this.refs.container);
      $button
        .tooltip('hide')
        .tooltip('show');
    }
  }
  componentWillUnmount() {
    const $button = $(this.refs.container);
    $button.tooltip('destroy');
  }
  title() {
    return this.props.enabled
      ? i18n.t('editor_disable_voting')
      : i18n.t('editor_enable_voting');
  }
  render() {
    const { enabled, onClick } = this.props;
    const iconClasses = classNames({
      'icon': true,
      'post-settings-voting': true,
      'post-settings-voted': enabled,
    });

    return (
      <button
        className="button button--outline-grey post-settings-button"
        data-original-title={this.getTitle()}
        onClick={onClick}
        ref="container"
      >
        <span className={iconClasses} />
      </button>
    );
  }
}

EditorVoteButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EditorVoteButton;
