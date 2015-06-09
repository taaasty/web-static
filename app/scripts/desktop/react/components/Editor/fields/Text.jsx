import _ from 'lodash';
import classnames from 'classnames';
import StringHelpers from '../../../../../shared/helpers/string';

//TODO: Maybe will be better if we will get this data from EditorStore?
const FIELD_MODES = ['inline', 'partial', 'rich'];
const FIELD_MODE_OPTIONS = {
  inline: {
    disableToolbar: true,
    disableReturn: false,
    disableDoubleReturn: true,
    paste: {
      cleanPastedHTML: true
    }
  },
  partial: {
    disableToolbar: true,
    disableReturn: false,
    disableDoubleReturn: true,
    paste: {
      cleanPastedHTML: true
    }
  },
  rich: {
    buttons: ['anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist'],
    disableToolbar: false,
    disableReturn: false,
    disableDoubleReturn: false,
    targetBlank: true,
    paste: {
      cleanPastedHTML: true
    }
  }
};

let EditorTextField = React.createClass({
  propTypes: {
    mode: React.PropTypes.string,
    text: React.PropTypes.string,
    placeholder: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      mode: 'inline'
    };
  },

  shouldComponentUpdate(nextProps) {
    let fieldContent = this.refs.fieldContent.getDOMNode();
    return fieldContent.innerHTML !== nextProps.text;
  },

  componentDidMount() {
    let fieldContent = this.refs.fieldContent.getDOMNode();
    let options = _.extend({}, FIELD_MODE_OPTIONS[this.props.mode], {
      placeholder: this.props.placeholder.replace('<br>', '\r\n')
    });

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
        <div ref="fieldContent"
             className="tasty-editor-content"
             dangerouslySetInnerHTML={{__html: this.props.text || ''}} />
      </div>
    );
  },

  handleInput(e) {
    this.props.onChange(value);
  }
})

export default EditorTextField;