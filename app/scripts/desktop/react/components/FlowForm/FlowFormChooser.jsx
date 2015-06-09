import classnames from 'classnames';
import UserActionCreators from '../../actions/User';
import FlowFormChooserResults from './FlowFormChooserResults';
import FlowFormChooserButton from './FlowFormChooserButton';

let FlowFormChooser = React.createClass({
  propTypes: {
    limitReached: React.PropTypes.bool,
    onChoose: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      slug: '',
      results: [],
      resultIndex: 0,
      open: false,
      loading: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.limitReached && this.props.limitReached != nextProps.limitReached) {
      this.setState({open: false});
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open && prevState.open != this.state.open) {
      this.refs.field.getDOMNode().focus();
    }
  },

  render() {
    let chooserClasses = classnames('flow-form__chooser', {
      'state--open': this.state.open,
      'state--disabled': this.props.limitReached
    });

    return (
      <div className={chooserClasses}>
        <FlowFormChooserButton
            limitReached={this.props.limitReached}
            onClick={this.handleButtonClick} />
        <div className="flow-form__chooser-dropdown">
          <input ref="field"
                 type="text"
                 value={this.state.slug}
                 className="flow-form__chooser-input"
                 onChange={this.handleFieldChange}
                 onKeyDown={this.handleFieldKeyDown}
                 onBlur={this.handleFieldBlur} />
          {this.renderResults()}
        </div>
      </div>
    );
  },

  renderResults() {
    if (this.state.loading) {
      return (
        <div className="flow-form__chooser-loading">
          <Spinner size={24} />
        </div>
      );
    } else {
      return (
        <FlowFormChooserResults
            results={this.state.results}
            selectedIndex={this.state.resultIndex}
            onResultClick={this.chooseResult} />
      );
    }
  },

  chooseResult(result) {
    this.setState({
      slug: '',
      results: [],
      resultIndex: 0,
      open: false
    });
    this.props.onChoose(result);
  },

  handleButtonClick() {
    if (!this.props.limitReached) this.setState({open: true});
  },

  handleFieldChange(e) {
    let { value } = e.target;

    if (value) {
      this.setState({slug: value, resultIndex: 0, loading: true});
      UserActionCreators.predict(value, 30)
        .then((results) => this.setState({results}))
        .always(() => this.setState({loading: false}));
    } else {
      this.setState({slug: value, results: [], resultIndex: 0});
    }
  },

  handleFieldKeyDown(e) {
    switch(e.key) {
      case 'Enter':
        e.preventDefault();
        if (this.state.results.length) {
          this.chooseResult(this.state.results[this.state.resultIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.setState({open: false});
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.moveHighlight(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.moveHighlight(1);
        break;
    }
  },

  handleFieldBlur() {
    if (this.state.slug === '') this.setState({open: false});
  },

  moveHighlight(delta) {
    let resultsCount = this.state.results.length,
        resultIndex = this.state.resultIndex;

    if (resultsCount) {
      if ((resultIndex > 0 && delta < 0) || (resultIndex < resultsCount - 1 && delta > 0)) {
        this.setState({resultIndex: resultIndex + delta});
      }
    }
  }
});

export default FlowFormChooser;