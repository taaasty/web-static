import React, { PropTypes } from 'react';
import classNames from 'classnames';

// @param: state
// loaded: - когда есть картинки
// - form, info: hidden
// - actions, display: show
//
// insert: - режим с формой для вставки
// - actions, form: show
// - info, action_rotate: hidden
//
// hidden: - все скрыто (не используется)
// - all hidden
//
// drag-hover
// - special border color
//
// null - по -умолчанию
// - display, actions: hidden
// - form, info: show

function EditorMediaBox({ state, entryType, children }) {
  const mediaBoxClasses = classNames({
    'media-box': true,
    [`state--${state}`]: !!state,
  });

  return (
    <figure className={entryType}>
      <div className={mediaBoxClasses}>
        {children}
      </div>
    </figure>
  );
}

EditorMediaBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  entryType: PropTypes.string.isRequired,
  state: PropTypes.string,
};

EditorMediaBox.defaultProps = {
  state: null,
};

export default EditorMediaBox;
