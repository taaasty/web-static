import React, { PropTypes } from 'react';
import classnames from 'classnames';
import MediumEditor from 'medium-editor';
import StringHelpers from '../../../../../shared/helpers/string';

//TODO: Maybe will be better if we will get this data from EditorStore?
const FIELD_MODES = ['inline', 'partial', 'rich'];
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

let EditorTextField = React.createClass({
  propTypes: {
    mode: PropTypes.string,
    text: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      mode: 'inline',
    };
  },

  shouldComponentUpdate(nextProps) {
    let fieldContent = this.refs.fieldContent;
    return fieldContent.innerHTML !== nextProps.text;
  },

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
    this.mediumEditor.subscribe('editableInput', this.handleInput);
  },

  componentWillUnmount() {
    this.mediumEditor.unsubscribe('editableInput', this.handleInput);
    this.mediumEditor.destroy();
    this.mediumEditor = null;
  },

  render() {
    let fieldClasses = classnames('tasty-editor', this.props.className);

    return (
      <div className={fieldClasses}>
        <div
          className="tasty-editor-content"
          dangerouslySetInnerHTML={{__html: this.props.text || ''}}
          ref="fieldContent"
        />
      </div>
    );
  },

  handleInput(e) {
    this.props.onChange(e.target.innerHTML);
  }
})

export default EditorTextField;
