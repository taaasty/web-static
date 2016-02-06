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
  } else if (_.isObject(obj) && Object.prototype.toString.call(obj) !== '[object File]') {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj)
  }
}

export default {
  settle(promises) {
    let d = $.Deferred(),
        counter = 0,
        results = Array(promises.length);

    _.forEach(promises, (promise,i) => {
      promise
        .then(() => {
          results[i] = {promise, state: 'fulfilled'};
        })
        .fail(() => {
          results[i] = {promise, state: 'rejected'};
        })
        .always(() => {
          counter++;
          let progress = (promises.length - (promises.length - counter)) / promises.length;
          d.notify(progress, promises.length);
          if (counter === promises.length) {
            d.resolve(results);
          }
        }); 
    });

    return d.promise();
  },
  prepareFormData(data) {
    let formData = new FormData();

    function add(key, value) {
      formData.append(key, value);
    };

    for(let key in data) {
      if(data.hasOwnProperty(key) && data[key] != null) {
        buildParams(key, data[key], false, add);
      }
    }

    return formData;
  }   
}
