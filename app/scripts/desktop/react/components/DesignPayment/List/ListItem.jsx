let DesignPaymentListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.element, React.PropTypes.array, React.PropTypes.string
    ])
  },

  render() {
    return (
      <li className="payment__item">
        <div className="payment__item-title"
             dangerouslySetInnerHTML={{__html: this.props.title}} />
        <div className="payment__item-content">
          {this.props.children}
        </div>
      </li>
    );
  }
});

export default DesignPaymentListItem;