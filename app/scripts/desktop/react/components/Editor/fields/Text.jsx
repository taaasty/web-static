import _ from 'lodash';
import classnames from 'classnames';

//TODO: Maybe will be better if we will get this data from EditorStore?
const FIELD_MODES = ['inline', 'partial', 'rich'];
const FIELD_MODE_OPTIONS = {
  inline: {
    disableToolbar: true,
    disableReturn: true,
    disableDoubleReturn: true,
    cleanPastedHTML: true
  },
  partial: {
    disableToolbar: true,
    disableReturn: false,
    disableDoubleReturn: true,
    cleanPastedHTML: true
  },
  rich: {
    buttons: ['anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist'],
    disableToolbar: false,
    disableReturn: false,
    disableDoubleReturn: false,
    cleanPastedHTML: true,
    targetBlank: true
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
  },
    
  componentWillUnmount() {
    this.mediumEditor.deactivate();
    this.mediumEditor = null;
  },

  render() {
    let fieldClasses = classnames('tasty-editor', this.props.className);

    return (
      <div className={fieldClasses}>
        <div ref="fieldContent"
             className="tasty-editor-content"
             onInput={this.handleInput}
             dangerouslySetInnerHTML={{__html: this.props.text || ''}} />
      </div>
    );
  },

  handleInput(e) {
    let value = e.target.innerHTML;
    this.props.onChange(value);
  }
})

export default EditorTextField;