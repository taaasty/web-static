/*global i18n */
import moment from 'moment';

export function msgDate(date) {
  const lf = moment.localeData().longDateFormat('L');
  const shortYearLf = lf.replace(/YYYY/g, 'YY');

  return moment(date).calendar(null, {
    sameDay: 'LT',
    lastDay: `[${i18n.t('messages_date_yesterday')}]`,
    lastWeek: shortYearLf,
    sameElse: shortYearLf,
  });
}
