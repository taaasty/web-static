import FlowActionCreators from '../../actions/Flow';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormAddress from '../FlowForm/FlowFormAddress';
import FlowFormStaff from '../FlowForm/FlowFormStaff';

let FlowSettings = React.createClass({
  propTypes: {
    flow: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      flowpic: React.PropTypes.object.isRequired
    }).isRequired,
    staff: React.PropTypes.array.isRequired,
    staffLimit: React.PropTypes.number.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
    onTitleChange: React.PropTypes.func.isRequired,
    onPicFileChange: React.PropTypes.func.isRequired,
    onAddressChange: React.PropTypes.func.isRequired,
    onStaffChoose: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
              flow={this.props.flow}
              onNameChange={this.props.onNameChange}
              onTitleChange={this.props.onTitleChange}
              onPicFileChange={this.props.onPicFileChange} />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <FlowFormAddress
                value={this.props.flow.slug}
                onChange={this.props.onAddressChange} />
          </div>
          <div className="flow-form__item">
            <FlowFormChooser
                limitReached={this.props.staffLimit === this.props.staff.length}
                onChoose={this.props.onStaffChoose} />
          </div>
        </div>
      </div>
    );
  }
});

export default FlowSettings;


<div class="flow-form__item">
  <div class="flow-form__chooser state--open">
    <div class="flow-form__chooser-button">
      <div class="flow-form__chooser-button-text">Укажите модераторов (не более трех)</div>
    </div>
    <div class="flow-form__chooser-dropdown">
      <input class="flow-form__chooser-input" type="text" />
      <div class="flow-form__chooser-results">
        <div class="flow-form__chooser-result state--active">
          <div class="flow-form__user">
            <div class="flow-form__user-avatar">
              <span class="avatar" style="background-image:url('http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/5c/85/2_original.jpg');">
                <img class="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/5c/85/2_original.jpg" alt="genue" />
              </span>
            </div><div class="flow-form__user-name">genue</div>
          </div>
        </div>
        <div class="flow-form__chooser-result">
          <div class="flow-form__user">
            <div class="flow-form__user-avatar">
              <span class="avatar" style="background-image:url('http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/6d/ec/232992_original.jpeg');">
                <img class="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/35x35/filters:no_upscale()/userpic/6d/ec/232992_original.jpeg" alt="sergeylaptev" />
              </span>
            </div><div class="flow-form__user-name">sergeylaptev</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flow-form__persons">
    <h5 class="flow-form__subtitle">Модераторы</h5>
    <ul class="persons">
      <li class="person">
        <div class="person__in">
          <div class="person__avatar">
            <a href="http://taaasty.com/~tallassa">
              <span class="avatar" style="background-image:url('http://thumbor0.tasty0.ru/unsafe/48x48/filters:no_upscale()/userpic/e1/12/162395_original.jpg');">
                <img class="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/48x48/filters:no_upscale()/userpic/e1/12/162395_original.jpg" alt="tallassa" />
              </span>
            </a>
          </div>
          <div class="person__desc">
            <a href="http://taaasty.com/~tallassa">
              <p class="person__name">tallassa</p>
            </a>
            <div class="person__count">699 записей</div>
          </div>
          <div class="person__actions">
            <div class="person__dropdown-container">
              <button class="button button--small button--outline button--icon"><i class="icon icon--cogwheel"></i></button>
              <div class="person__dropdown state--open">
                <a class="person__dropdown-item state--active" href="#">Модератор</a>
                <a class="person__dropdown-item" href="#">Редактор</a>
              </div>
            </div>
            <button class="button button--small button--red">Удалить</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>


// let FlowCreator = React.createClass({
//   propTypes: {
//     staffLimit: React.PropTypes.number
//   },

//   getDefaultProps() {
//     return {
//       staffLimit: 3
//     };
//   },

//   getInitialState() {
//     return {
//       name: '',
//       title: '',
//       picFile: null,
//       staff: []
//     };
//   },

//   render() {
//     let emptyFlow = {
//       name: '',
//       title: '',
//       flowpic: {
//         url: 'http://taaasty.com/images/hero-cover.jpg'
//       }
//     };

//     return (
//       <div className="flow-form">
//         <div className="flow-form__header">
//           <FlowFormHero
//               flow={emptyFlow}
//               onNameChange={this.updateValue.bind(null, 'name')}
//               onTitleChange={this.updateValue.bind(null, 'title')}
//               onPicFileChange={this.updateValue.bind(null, 'picFile')} />
//         </div>
//         <div className="flow-form__body">
//           <div className="flow-form__item">
//             <div className="flow-form__right">
//               <button className="button button--yellow button--small"
//                       onTouchTap={this.handleButtonClick}>
//                 Создать поток
//               </button>
//             </div>
//             <div className="flow-form__left">
//               <FlowFormChooser
//                   limitReached={this.props.staffLimit == this.state.staff.length}
//                   onChoose={this.handleStaffChoose} />
//             </div>
//             <FlowFormStaff
//                 staff={this.state.staff}
//                 onDelete={this.handleStaffDelete} />
//           </div>
//         </div>
//       </div>
//     );
//   },

//   updateValue(name, value) {
//     this.setState({[name]: value});
//   },

//   handleStaffChoose(user) {
//     let newStaff = this.state.staff.concat(user);
//     this.setState({staff: newStaff});
//   },

//   handleStaffDelete(staff) {
//     let newStaff = this.state.staff.filter((user) => staff.id !== user.id);
//     this.setState({staff: newStaff});
//   },

//   handleButtonClick() {
//     FlowActionCreators.create(this.state)
//   }
// });

// export default FlowCreator;








// <div class="flow-form">
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