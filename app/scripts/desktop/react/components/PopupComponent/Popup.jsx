import cloneWithProps from 'react/lib/cloneWithProps';
import PopupHeader from './PopupHeader';

let Popup = React.createClass({
  mixins: ['ReactActivitiesMixin'],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onClose: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired
  },

  render() {
    let popupClasses = ['popup', this.props.className].join(' ');
    let children = React.Children.map(this.props.children, ((child) =>
      cloneWithProps(child, {activitiesHandler: this.activitiesHandler})
    ));

    return (
      <div className={popupClasses}>
        <PopupHeader
            title={this.props.title}
            hasActivities={this.hasActivities()}
            onClose={this.props.onClose} />
        <div className="popup__body">
          {children}
        </div>
      </div>
    );
  }
});

export default Popup;