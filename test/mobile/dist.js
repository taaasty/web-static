/*global global */
import { expect } from 'chai';

const React = global.React;
const { isCompositeComponent, renderIntoDocument } = global.ReactTestUtils;

const user = {
  userpic: {
    default_colors: {},
  },
};

const tlog = {
  author: user,
  total_entries_count: 0,
  private_entries_count: 0,
  public_entries_count: 0,
  id: 0,
  slug: '',
  title: '',
  tag: '',
  stats: {
    entries_count: 0,
  },
};

const currentUser = { ...user, api_key: {} };

// Components
const components = {
  NotificationsPage: {
    currentUser,
  },
  SettingsPage: { currentUser },
  MessengerPage: {
    currentUser,
    conversationsInfo: {},
  },
  MessengerThreadPage: {
    currentUser,
    conversation: {
      recipient: {
        design: {},
      },
    },
    messagesInfo: {
      items: [],
      totalCount: 0,
    },
  },
  TlogDaylogPage: {
    currentUser,
    tlog,
    pagination: {},
    entries: [],
  },
  TlogRegularPage: {
    currentUser,
    tlog,
    pagination: {},
    entries: [],
  },
  EntryPage: {
    currentUser,
    tlog,
    entry: {
      tlog,
      author: user,
    },
  },
  FlowsPage: {
    currentUser,
    flows: {
      items: [],
    },
  },
};

Object.keys(components).forEach((componentName) => {
  const props = components[componentName];
  const Component = global[componentName];
  describe(`[Mobile][Component] ${componentName}`, () => {
    it('should render into valid element', () => {
      const component = renderIntoDocument(
          <Component {...props} />
      );

      expect(isCompositeComponent(component)).to.be.true;
    });
  });
});
