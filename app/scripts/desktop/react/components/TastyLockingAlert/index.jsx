/*global $ */
import React, { Component, PropTypes } from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

const FADE_DURATION = 300;
const START_TIMEOUT = 3000;

class TastyLockingAlert extends Component {
  componentDidMount() {
    this.open();
    window.setTimeout(() => this.props.action(), START_TIMEOUT);
    $('body').addClass('no-scroll confirmation-enabled');
  }
  componentWillUnmount() {
    $('body').removeClass('no-scroll confirmation-enabled');
  }
  open() {
    $(this.refs.container)
      .css('display', 'none')
      .fadeIn(FADE_DURATION);
  }
  render() {
    const { message, title } = this.props;
    
    return (
      <div className="confirmation" ref="container">
         <div className="confirmation__main">
           <div className="confirmation__cell">
             <div className="confirmation__box">
               {title && <b>{title}</b>}
               <div
                 className="confirmation__text"
                 dangerouslySetInnerHTML={{__html: message || ''}}
               />
               <div className="confirmation__buttons">
                 <Spinner size={30} />
               </div>
             </div>
           </div>
         </div>
      </div>
    );
  }
}


TastyLockingAlert.propTypes = {
  action: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default TastyLockingAlert;
