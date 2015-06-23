let SelectBox = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    options: React.PropTypes.array.isRequired,
    withSearchBox: React.PropTypes.bool,
    onSelect: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      withSearchBox: true
    };
  },

  componentDidMount() {
    let initOptions = this.getInitOptions(),
        $select = $(this.getDOMNode()).select2(initOptions);
    $select.on('select2:select', this.handleSelect);
  },

  componentWillUnmount() {
    let $select = $(this.getDOMNode());
    $select.off('select2:select', this.handleSelect);
    $select.select2('destroy');
  },

  render() {
    let optionList = this.props.options.map((option) =>
      <option value={option.value} key={option.value}>
        {option.text}
      </option>
    );

    return (
      <select value={this.props.value}>
        {optionList}
      </select>
    );
  },

  getInitOptions() {
    let initOptions = {};

    if (!this.props.withSearchBox) {
      initOptions.minimumResultsForSearch = Infinity;
    }

    return initOptions;
  },

  handleSelect(e) {
    this.props.onSelect(e.target.value);
  }
});

export default SelectBox;