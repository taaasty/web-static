import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import FlowManagerRequests from './FlowManagerRequests';
import FlowSettingsContainer from '../FlowSettings/FlowSettingsContainer';

let FlowManager = React.createClass({
  propTypes: {
    flow: React.PropTypes.object.isRequired
  },

  render() {
    // <TabPane tab="Настройки">
    //       <FlowSettingsContainer flow={this.props.flow} />
    //     </TabPane>
    return (
      <TabbedArea>
        <TabPane tab="Заявки" count={6}>
          <FlowManagerRequests />
        </TabPane>
        <TabPane tab="Подписчики" count={23487}>Подписчики</TabPane>
        <TabPane tab="Заблокированные" count={12}>Заблокированные</TabPane>
      </TabbedArea>
    );
  }

  // getNavItems() {
  //   return [{
  //     title: 'Настройки'
  //   }, {
  //     title: 'Заявки',
  //     count: 6
  //   }, {
  //     title: 'Подписчики',
  //     count: 214
  //   }, {
  //     title: 'Заблокированные',
  //     count: 4
  //   }];
  // }
});

export default FlowManager;

// <div class="popup popup--dark popup--flows">
//             <div class="popup__header">
//               <div class="popup__headbox">
//                 <h3 class="popup__title">Управление потоком</h3>
//               </div>
//               <div class="popup__close">
//                 <i class="icon icon--cross"></i>
//               </div>
//             </div>
//             <div class="popup__body">
              
//               <div class="tabs-panel">
//                 <!-- Flow Form -->
//                 <div class="flow-form">
//                   <div class="flow-form__header">
//                     <div class="flow-form__hero" style="background-image: url(images/hero-cover.jpg);">
//                       <span class="form-upload form-upload--icon">
//                         <input class="form-upload__input" type="file" />
//                         <span class="form-upload__text">
//                           <i class="icon icon--image-circle"></i>
//                         </span>
//                       </span>
//                       <div class="flow-form__hero-box">
//                         <div class="flow-form__hero-title">
//                           <div data-react-class="EditableField" data-react-props='{"defaultValue": "", "placeholder": "#Название потока", "onEditEnd": "javascript:void(0)"}'></div>
//                         </div>
//                         <div class="flow-form__hero-text">
//                           <div data-react-class="EditableField" data-react-props='{"defaultValue": "", "placeholder": "Краткое описание, не более 150 символов", "onEditEnd": "javascript:void(0)"}'></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="flow-form__body">
//                     <div class="flow-form__item">
//                       <label class="form-field-label">
//                         <div class="form-field form-field--default form-field--binary">
//                           <div class="form-field__text">http://taaasty.com/<span class="tilde">~</span></div>
//                           <div class="form-field__box">
//                             <input class="form-field__input" type="text" placeholder="адрес потока" />
//                           </div>
//                           <div class="form-field__bg"></div>
//                         </div>
//                       </label>
//                     </div>
//                     <div class="flow-form__item">
//                       <div class="flow-form__chooser state--open">
//                         <div class="flow-form__chooser-button">
//                           <div class="flow-form__chooser-button-text">Укажите модераторов (не более трех)</div>
//                         </div>
//                         <div class="flow-form__chooser-dropdown">
//                           <input class="flow-form__chooser-input" type="text" />
//                           <div class="flow-form__chooser-results">
//                             <div class="flow-form__chooser-result state--active">
//                               <div class="flow-form__user">
//                                 <div class="flow-form__user-avatar">
//                                   <span class="avatar" style="background-image:url('http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/5c/85/2_original.jpg');">
//                                     <img class="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/5c/85/2_original.jpg" alt="genue" />
//                                   </span>
//                                 </div><div class="flow-form__user-name">genue</div>
//                               </div>
//                             </div>
//                             <div class="flow-form__chooser-result">
//                               <div class="flow-form__user">
//                                 <div class="flow-form__user-avatar">
//                                   <span class="avatar" style="background-image:url('http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/6d/ec/232992_original.jpeg');">
//                                     <img class="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/6d/ec/232992_original.jpeg" alt="sergeylaptev" />
//                                   </span>
//                                 </div><div class="flow-form__user-name">sergeylaptev</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="flow-form__persons">
//                         <h5 class="flow-form__subtitle">Модераторы</h5>
//                         <ul class="persons">
//                           <li class="person">
//                             <div class="person__in">
//                               <div class="person__avatar">
//                                 <a href="http://taaasty.com/~tallassa">
//                                   <span class="avatar" style="background-image:url('http://thumbor0.tasty0.ru/unsafe/48x48/filters:no_upscale()/userpic/e1/12/162395_original.jpg');">
//                                     <img class="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/48x48/filters:no_upscale()/userpic/e1/12/162395_original.jpg" alt="tallassa" />
//                                   </span>
//                                 </a>
//                               </div>
//                               <div class="person__desc">
//                                 <a href="http://taaasty.com/~tallassa">
//                                   <p class="person__name">tallassa</p>
//                                 </a>
//                                 <div class="person__count">699 записей</div>
//                               </div>
//                               <div class="person__actions">
//                                 <div class="person__dropdown-container">
//                                   <button class="button button--small button--outline button--icon"><i class="icon icon--cogwheel"></i></button>
//                                   <div class="person__dropdown state--open">
//                                     <a class="person__dropdown-item state--active" href="#">Модератор</a>
//                                     <a class="person__dropdown-item" href="#">Редактор</a>
//                                   </div>
//                                 </div>
//                                 <button class="button button--small button--red">Удалить</button>
//                               </div>
//                             </div>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="flow-form__footer">
//                     <button class="flow-form__save-button">Сохранить</button>
//                   </div>
//                 </div>
//                 <!-- end Flow Form -->
//               </div>
//             </div>
//           </div>
//         </div>