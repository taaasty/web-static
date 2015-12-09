import { expect } from 'chai';

const React = global.React;
const { isCompositeComponent, renderIntoDocument } = React.addons.TestUtils;

// Components
const components = {
  HeroFlow: {
    flow: {
      flowpic: {
        original_url: '',
      },
      title: '',
      name: '',
    },
  },
  FlowBricksContainer: {
    limit: 1,
    loadUrl: '',
    canLoad: false,
    flows_info: {
      items: [],
    },
  },
  HeroFlows: {
    backgroundUrl: '',
    title: '',
    text: '',
  },
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
  AvatarToolbarContainer: {},
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
  UserAvatar: {
    user: {
      tag: '',
      name: '',
      userpic: {
        default_colors: {},
      },
    },
  },
  Calendar: {},
  FollowButton: {
    relationship: {
      state: '',
    },
  },
  Voting: {},
  UserToolbarContainer: {},
  LiveLoadButtonContainer: {},
  BestLoadButtonContainer: {},
  FriendsLoadButtonContainer: {},
  FeedPageBody: {},
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
  TlogPageBody: {
    
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
    stats: {},
    commentator: {
      userpic: {
        default_colors: {},
      },
    },
  },
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
