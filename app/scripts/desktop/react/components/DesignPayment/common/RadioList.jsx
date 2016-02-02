import DesignPaymentRadioListItem from './RadioListItem';

let DesignPaymentRadioList = React.createClass({
  propTypes: {
    style: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  },

  render() {
    let listClasses = ['form-radiogroup', 'form-radiogroup--' + this.props.style].join(' ');
    let listItems = this.props.items.map(item => {
      return <DesignPaymentRadioListItem value={item} custom={item === ':ANY:'} key={item} />;
    });

    return (
      <span className={listClasses}>
        {listItems}
      </span>
    );
  }
});

export default DesignPaymentRadioList;