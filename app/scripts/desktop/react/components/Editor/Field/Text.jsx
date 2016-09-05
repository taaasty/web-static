import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Editor from 'react-medium-editor';
import striptags from 'striptags';

const FIELD_MODE_OPTIONS = {
  inline: {
    disableReturn: false,
    disableDoubleReturn: true,
    paste: {
      cleanPastedHTML: true,
    },
    toolbar: false,
  },
  partial: {
    disableReturn: false,
    disableDoubleReturn: true,
    paste: {
      cleanPastedHTML: true,
    },
    toolbar: false,
  },
  rich: {
    disableToolbar: false,
    disableReturn: false,
    disableDoubleReturn: false,
    targetBlank: true,
    paste: {
      cleanPastedHTML: true,
    },
    toolbar: {
      buttons: ['anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist'],
    },
  },
};

class EditorTextField extends Component {
  render() {
    const {
      className,
      mode,
      onChange,
      placeholder,
      text,
    } = this.props;
    const fieldClasses = classNames('tasty-editor', className, {
      'medium--hide-placeholder': striptags(text).length > 0, // optimized use
    });
    const options = Object.assign({}, FIELD_MODE_OPTIONS[mode], {
      placeholder: {
        text: placeholder.replace('<br>', '\r\n'),
      },
    })

    return (
      <div className={fieldClasses}>
        <Editor
          className="tasty-editor-content"
          onChange={onChange}
          options={options}
          text={text}
        />
      </div>
    );
  }
}

EditorTextField.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string,
};

EditorTextField.defaultProps = {
  mode: 'inline',
  text: '',
};

export default EditorTextField;
