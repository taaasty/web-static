let EntryMetaDate = React.createClass({
  propTypes: {
    date: React.PropTypes.string.isRequired,
    entryUrl: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <a href={this.props.entryUrl} className="meta-date">
        {this.getFormattedDate()}
      </a>
    );
  },

  getFormattedDate() {
    let now = moment(),
        entryDate = moment(this.props.date),
        date;

    if (now.diff(entryDate, 'days') < 1) {
      date = entryDate.calendar();
    } else {
      if (now.year() != entryDate.year()) {
        date = entryDate.format('D MMMM YYYY');
      } else {
        date = entryDate.format('D MMMM');
      }
    }

    return date;
  }
});

export default EntryMetaDate;