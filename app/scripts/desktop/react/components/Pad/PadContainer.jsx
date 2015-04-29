import Pad from './Pad';

function closest(el, target) {
  while (target.parentNode) {
    if (target === el) return true;
    target = target.parentNode;
  }
  return false;
}

let PadContainer = React.createClass({
  propTypes: {
    placement: React.PropTypes.string,
    actSelector: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      placement: 'left'
    };
  },

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick, false);
    document.addEventListener('scroll', this.onDocumentScroll, false);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
    document.removeEventListener('scroll', this.onDocumentScroll, false);
  },

  render() {
    return <Pad {...this.props} />;
  },

  onDocumentClick(e) {
    let isClickInside = closest(this.getDOMNode(), e.target);
    if (!isClickInside) this.props.onClose();
  },

  onDocumentScroll() {
    this.props.onClose();
  }
 });

export default PadContainer;