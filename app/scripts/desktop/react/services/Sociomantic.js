import { sha256 } from 'js-sha256';

export const SM_TLOG_ENTRY = 'Пост';

const advToken = 'taaasty-ru';

const x = document.getElementsByTagName('script')[0];
const s = document.createElement('script');
s.type  = 'text/javascript';
s.async = true;
s.src   = ( 'https:' == document.location.protocol ? 'https://' : 'http://') +
  'eu-sonar.sociomantic.com/js/2010-07-01/adpan/taaasty-ru';
s.onload = runQueue;
x.parentNode.insertBefore( s, x );

const queue = [];

function addToQueue(fn) {
  queue.push(fn);
}

function runQueue() {
  let fn = void 0;

  if (!window.sociomantic) {
    return;
  }
  
  while ((fn = queue.shift())) {
    fn.call();
  }
}

export function sendCategory(name) {
  if (!window.sociomantic) {
    addToQueue(sendCategory.bind(void 0, name));
    return;
  }

  window.sociomantic.sonar.adv[advToken].clear();
  window.product = { category: [ name ] };
  window.sociomantic.sonar.adv[advToken].track();
}

export function sendUser(user) {
  if (!window.sociomantic) {
    addToQueue(sendUser.bind(void 0, user));
    return;
  }

  window.sociomantic.sonar.adv[advToken].clear();
  window.customer = {
    identifier: user.id.toString(),
    mhash: user.email && sha256(user.email),
  };
  window.sociomantic.sonar.adv[advToken].track();
}

export function sendRegister(id) {
  if (!window.sociomantic) {
    addToQueue(sendRegister.bind(void 0, id));
    return;
  }

  window.sociomantic.sonar.adv[advToken].clear();
  window.lead = id;
  window.sociomantic.sonar.adv[advToken].track();
}
