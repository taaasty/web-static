import React, { Component, PropTypes } from 'react';

import FlowsActions from '../../actions/view/FlowsActions';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroFeed from '../hero/feed';
import FlowsListContainer from './FlowsListContainer';

import { SM_FLOWS_LIST, sendCategory } from '../../../../shared/react/services/Sociomantic';

const bgImageUrl = '/images/hero-cover.jpg';

class FlowsPage extends Component {
  componentWillMount() {
    const { flows, sort } = this.props;

    FlowsActions.init(flows, sort);
    sendCategory(SM_FLOWS_LIST);
  }
  render() {
    const { currentUser, flows, locale } = this.props;

    return (
      <PageWithAuth currentUser={currentUser} locale={locale}>
        <PageLayout>
          <PageHeader>
            <HeroFeed backgroundUrl={bgImageUrl} title={i18n.t('feed.flows')} />
          </PageHeader>
          <PageBody>
            <FlowsListContainer />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

FlowsPage.propTypes = {
  currentUser: PropTypes.object,
  flows: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

FlowsPage.defaultProps = {
  flows: {'items': [{'flow': {'id': 295775,'name': 'Психология отношений','title': 'Для тех, кто хочет улучшить свои отношения или создать крепкую семью. Отношениям нужно учиться...давайте делать это вместе. Подписывайтесь!','slug': 'psihologiya-otnosheniy','tlog_url': 'http: //taaasty.com/~psihologiya-otnosheniy','flowpic': {'original_url': 'https: //tasty-prod.s3.amazonaws.com/assets/flow/userpic_file/295775/5c97ae2f-0a33-4f3c-b830-aa9a2abba303-295775_original.jpg'},'is_privacy': false,'is_premoderate': false,'tag': '~psihologiya-otnosheniy','followers_count': 494,'public_tlog_entries_count': 123},'relationship': {'id': null,'user_id': 295775,'reader_id': 1386514,'position': null,'state': 'none'}},{'flow': {'id': 296327,'name': 'Фото на смартфон','title': 'Ваши лучшие фотографии, сделанные на камеру смартфона/мобильного телефона, советы по обработке фото, тематические фотоконкурсы.','slug': 'smartphone-photography','tlog_url': 'http: //taaasty.com/~smartphone-photography','flowpic': {'original_url': 'https: //tasty-prod.s3.amazonaws.com/assets/flow/userpic_file/296327/32a1a57c-c2fc-4c30-bf6b-92f7248c4e21-296327_original.jpg'},'is_privacy': false,'is_premoderate': false,'tag': '~smartphone-photography','followers_count': 492,'public_tlog_entries_count': 474},'relationship': {'id': null,'user_id': 296327,'reader_id': 1386514,'position': null,'state': 'none'}},{'flow': {'id': 294872,'name': 'Поттериана','title': 'always.','slug': 'potteriana','tlog_url': 'http: //taaasty.com/~potteriana','flowpic': {'original_url': 'https: //tasty-prod.s3.amazonaws.com/assets/flow/userpic_file/294872/f1b43e70-7922-4264-a3b8-bd21afb56bbf-294872_original.jpg'},'is_privacy': false,'is_premoderate': false,'tag': '~potteriana','followers_count': 458,'public_tlog_entries_count': 79},'relationship': {'id': null,'user_id': 294872,'reader_id': 1386514,'position': null,'state': 'none'}}],'total_count': 1065,'current_page': 1,'total_pages': 27,'next_page': 2,'has_more': true,'limit': 40},
  sort: 'popular',
};

export default FlowsPage;
