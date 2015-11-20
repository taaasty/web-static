import EntryActionCreators from '../actions/Entry';
import CurrentUserStore from '../stores/current_user';
import Auth from '../components/Auth';

/*
 пока решаем проблему хранения действия через actionMap и sessionStorage/localStorage
 при переходе к SPA возможно будет заменить такой топорный метод на замыкания/Promise
 */

const actionMap = {
  'vote': EntryActionCreators.vote,
};

const ss = window.sessionStorage;
let prefix = '';
let reg = new RegExp(/\./);
let app = void 0;

function PostAuthService() {
  function init(application, str) {
    app = application;
    prefix = str;
    reg = new RegExp(`^${str}\.`);
  }

  function storeName(name) {
    return `${prefix}.${name}`;
  }

  function getDelayedActions() {
    const actions = [];
    let key;

    for(let i = 0; i < ss.length; i++) {
      key = ss.key(i);
      if (reg.test(key)) {
        try {
          actions.push([key, JSON.parse(ss.getItem(key))]);
        } catch(e) {}
      }
    }

    return actions;
  }

  function delayAction(key, args) {
    try {
      ss.setItem(storeName(key), JSON.stringify(args));
    } catch (e) {}
  }

  function runDelayed([ key, args ]) {
    const f = actionMap[key.replace(reg, '')];
    const isLogged = CurrentUserStore.isLogged();

    if (isLogged && f) {
      f.apply(null, args);
      ss.removeItem(key);
    }
  }

  function run(key, reason, cb, ...args) {
    if (CurrentUserStore.isLogged()) {
      cb(...args);
    } else {
      delayAction(key, args);
      app.shellbox.show(Auth, { text: reason });
    }
  }

  function restore() {
    const delayedActions = getDelayedActions();

    delayedActions.forEach(runDelayed);
  }

  return {
    init,
    restore,
    run,
  };
}

export default PostAuthService();
