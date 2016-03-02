/*global global */
import { expect } from 'chai';

const React = global.React;
const { isCompositeComponent, renderIntoDocument } = global.ReactTestUtils;

// Components
const components = {
  ImageAttachmentsCollage: {
    imageAttachments: [],
  },
  ScreenViewer: {
    sourceImages: [],
  },
  ConfirmRegistrationShellbox: {
    type: 'email',
    postUrl: '',
    proposetSlug: '',
  },
  PeopleItem: {
    user: {
      title: '',
      userpic: {
        default_colors: {},
      },
    },
  },
  Auth: {},
  EditorNew: {},
  EditorEdit: {
    entry: {},
  },
  EntryTlog: {
    commentator: {
      userpic: {
        default_colors: {},
      },
    },
    entry: {
      author: {
        userpic: {},
      },
      tlog: {
        userpic: {},
      },
      rating: {},
    },
  },
  TlogAlertContainer: {},
  FollowButton: {
    relationship: {
      state: '',
    },
  },
  Voting: {
    rating: {
      reasons: [],
    },
  },
  UserToolbarContainer: {},
  /*
  FeedPageBody: {},
  Calendar: {},
  EntryPageContainer: {
    user: {
      tag: '',
      name: '',
      userpic: {
        default_colors: {},
      },
    },
    stats: {},
    commentator: {
      userpic: {
        default_colors: {},
      },
    },
    entry: {
      author: {
        userpic: {},
      },
      tlog: {
        userpic: {},
      },
      rating: {},
    },
  },
  TlogPageContainer: {
    relationship: {
      state: '',
    },
    user: {
      tag: '',
      name: '',
      userpic: {
        default_colors: {},
      },
    },
    entries_info: {
      items: [],
    },
    stats: {},
    commentator: {
      userpic: {
        default_colors: {},
      },
    },
  },
  */
};

Object.keys(components).forEach((componentName) => {
  const props = components[componentName];
  const Component = global[componentName];
  describe(`[Desktop][Component] ${componentName}`, () => {
    it('should render into valid element', () => {
      const component = renderIntoDocument(
          <Component {...props} />
      );

      expect(isCompositeComponent(component)).to.be.true;
    });
  });
});
