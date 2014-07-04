###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  render: ->
   `<div className="calendar__timeline-viewport">
      <div className="calendar__timeline">
        <ul className="calendar__periods">
          <li className="calendar__period">
            <div className="calendar__period-date">2009</div>
            <div className="calendar__period-line">
              <a className="calendar__period-marker" href="#" data-marker-date="25 апреля" data-marker-rows="1 запись" style={{ left: '30%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="27 июля" data-marker-rows="2 записи" style={{ left: '50%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="1 ноября" data-marker-rows="1 запись" style={{ left: '80%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="31 декабря" data-marker-rows="1 запись" style={{ left: '100%' }}></a>
            </div>
          </li>
          <li className="calendar__period">
            <div className="calendar__period-date">2010</div>
            <div className="calendar__period-line">
              <a className="calendar__period-marker" href="#" data-marker-date="1 января" data-marker-rows="1 запись" style={{ left: '0%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="2 февраля" data-marker-rows="2 запись" style={{ left: '12%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="6 февраля" data-marker-rows="2 записи" style={{ left: '16%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="1 марта" data-marker-rows="1 запись" style={{ left: '22%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="20 марта" data-marker-rows="1 запись" style={{ left: '30%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="25 апреля" data-marker-rows="1 запись" style={{ left: '34%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="29 апреля" data-marker-rows="2 запись" style={{ left: '35%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="30 апреля" data-marker-rows="2 записи" style={{ left: '37%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="4 мая" data-marker-rows="1 запись" style={{ left: '40%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="6 мая" data-marker-rows="1 запись" style={{ left: '42%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="8 мая" data-marker-rows="1 запись" style={{ left: '44%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="9 мая" data-marker-rows="1 запись" style={{ left: '45%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="27 июля" data-marker-rows="2 записи" style={{ left: '50%' }}></a>
              <a className="calendar__period-marker" href="#" data-marker-date="1 ноября" data-marker-rows="1 запись" style={{ left: '80%' }}></a>
            </div>
          </li>
          <li className="calendar__period">
            <div className="calendar__period-date">2011</div>
            <div className="calendar__period-line">
              <a className="calendar__period-marker" href="#" data-marker-date="14 сенября" data-marker-rows="1 запись" style={{ left: '70%' }}></a>
            </div>
          </li>
          <li className="calendar__period">
            <div className="calendar__period-date">2012</div>
            <div className="calendar__period-line">
              <a className="calendar__period-marker" href="#" data-marker-date="31 декабря" data-marker-rows="1 запись" style={{ left: '100%' }}></a>
            </div>
          </li>
          <li className="calendar__period">
            <div className="calendar__period-date">2013</div>
            <div className="calendar__period-line">
              <a className="calendar__period-marker" href="#" data-marker-date="21 мая" data-marker-rows="1 запись" style={{ left: '50%' }}></a>
            </div>
          </li>
        </ul>
      </div>
    </div>`


module.exports = CalendarTimeline