import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import MediumEditor from 'medium-editor';

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
  componentDidMount() {
    const fieldContent = this.refs.fieldContent;
    const modeOptions = FIELD_MODE_OPTIONS[this.props.mode];
    const options = {
      ...modeOptions,
      placeholder: {
        ...modeOptions.placeholder,
        text: this.props.placeholder.replace('<br>', '\r\n'),
      },
    };

    this.mediumEditor = new MediumEditor(fieldContent, options);
    this.inputHandler = this.handleInput.bind(this);
    this.mediumEditor.subscribe('editableInput', this.inputHandler);
  }
  shouldComponentUpdate(nextProps) {
    let fieldContent = this.refs.fieldContent;
    return fieldContent.innerHTML !== nextProps.text;
  }
  componentWillUnmount() {
    this.mediumEditor.unsubscribe('editableInput', this.inputHandler);
    this.mediumEditor.destroy();
    this.mediumEditor = null;
  }
  handleInput(e) {
    this.props.onChange(e.target.innerHTML);
  }
  render() {
    const fieldClasses = classNames('tasty-editor', this.props.className);

    return (
      <div className={fieldClasses}>
        <div
          className="tasty-editor-content"
          dangerouslySetInnerHTML={{ __html: this.props.text || '' }}
          ref="fieldContent"
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
};

export default EditorTextField;
