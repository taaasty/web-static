import numeral from 'numeral';

// Currency format:
//   'iso_code': 'RUB',
//   'iso_numeric': '643',
//   'name': 'Russian Ruble',
//   'symbol': '₽',
//   'html_name': 'руб.',
//   'human_name': 'Российские рубли',
//   'symbol_first': false,
//   'thousands_separator': '.',
//   'decimal_mark': ',',
//   'subunit_to_unit': 100,
//   'smallest_denomination': 1,
//   'exponent': 2

let Money = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired,
    currency: React.PropTypes.object.isRequired,
    format: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      format: '0,0[.]00 $'
    };
  },

  render() {
    let unit = this.props.value / this.props.currency.subunit_to_unit;
    return <span>{numeral(unit).format(this.props.format)}</span>;
    // 299 рублей
  }
});

export default Money;