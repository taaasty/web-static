import _ from 'lodash';

function buildParams(prefix, obj, traditional, add) {
  let name, i, v,
      rbracket = /\[\]$/;

  if (_.isArray(obj)) {
    // Serialize array item.
    for (i = 0; obj && i < obj.length; i++) {
      v = obj[i]
      if (traditional || rbracket.test(prefix)) {
        // Treat each array item as a scalar.
        add(prefix, v)
      } else {
        buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
      }
    }
  } else if (_.isObject(obj)) {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj)
  }
}

function csrfToken() {
  let tokenNode = document.querySelector('[name="csrf-token"]'),
      token;

  if (tokenNode != null) {
    token = tokenNode.getAttribute('content');
  } else {
    token = null;
  }
  
  return token;
}

const Submitter = {
  request(method = 'POST', url, data, traditional = false) {
    let form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', url);

    function add(key, value) {
      let hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', value);
      form.appendChild(hiddenField);
    };

    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        buildParams(key, data[key], traditional, add);
      }
    }

    // Add CSRF-token
    let token = csrfToken();
    if (token != null) {
      buildParams('authenticity_token', token, traditional, add);
    }

    document.body.appendChild(form);
    form.submit();
  },

  getRequest(url, data, traditional = false) {
    this.request('GET', url, data, traditional);
  },

  postRequest(url, data, traditional = false) {
    this.request('POST', url, data, traditional);
  }
};

export default Submitter;