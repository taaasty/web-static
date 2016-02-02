let PopupSpinner = React.createClass({
  render() {
    return (
      <div className="popup__loader">
        <Spinner size={8} />
      </div>
    );
  }
});

export default PopupSpinner;