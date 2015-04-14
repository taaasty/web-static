// Подключаем оригинальный файл с локализацией. В нём производится определение перевода
// вида moment.defineLocale(...)
require('../../../../../node_modules/moment/locale/ru');

// Перезаписываем необходимые правила вендорной локализации.

function plural(word, num) {
  var forms = word.split('_');
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}

function pastTime(output) {
  return output != 'только что' ? '%s назад'.replace(/%s/i, output) : output;
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
  var format = {
      'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
      'hh': 'час_часа_часов',
      'dd': 'день_дня_дней',
      'MM': 'месяц_месяца_месяцев',
      'yy': 'год_года_лет'
  };

  if (key === 'm') {
    return withoutSuffix ? 'минута' : 'минуту';
  }
  else {
    return number + ' ' + plural(format[key], +number);
  }
}

moment.locale('ru', {
  relativeTime : {
    future : 'через %s',
    past : pastTime,
    s : 'только что',
    m : relativeTimeWithPlural,
    mm : relativeTimeWithPlural,
    h : 'час',
    hh : relativeTimeWithPlural,
    d : 'день',
    dd : relativeTimeWithPlural,
    M : 'месяц',
    MM : relativeTimeWithPlural,
    y : 'год',
    yy : relativeTimeWithPlural
  }
});