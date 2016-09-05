import { PropTypes } from 'react';

const { any, bool, number, object, oneOf, shape, string } = PropTypes;

export const tlog = shape({
  id: number.isRequired,
  name: string.isRequired,
  slug: string.isRequired,
  design: object.isRequired,
  isPrivacy: bool.isRequired,
  publicTlogEntriesCount: number.isRequired,
  canEdit: bool,
  canWrite: bool,
});

export const flow = tlog;

export const pagination = shape({
  type: string.isRequired,
  currentPage: number.isRequired,
  totalPagesCount: number.isRequired,
});

// TODO: specify required fields and type of position field
export const relationship = shape({
  id: number,
  position: any,
  readerId: number,
  state: string,
  userId: number,
});

const gender = oneOf(['f', 'm']);

export const heroUser = shape({
  gender,
  createdAt: string.isRequired,
  features: shape({
    flows: bool.isRequired,
    notification: bool.isRequired,
    search: bool.isRequired,
  }),
  hasDesignBundle: bool.isRequired,
  id: number.isRequired,
  isDaylog: bool,
  isFemale: bool.isRequired,
  isFlow: bool.isRequired,
  isPremium: bool.isRequired,
  isPrivacy: bool,
  locale: string.isRequired,
  name: string.isRequired,
  privateEntriesCount: number.isRequired,
  publicEntriesCount: number.isRequired,
  slug: string.isRequired,
  tag: string.isRequired,
  title: string,
  tlogUrl: string.isRequired,
  totalEntriesCount: number.isRequired,
  updatedAt: string.isRequired,
  userpic: shape({
    defaultColors: shape({
      background: string,
      name: string,
    }),
    kind: string.isRequired,
    largeUrl: string,
    originalUrl: string,
    symbol: string,
    thumb128Url: string,
    thumb64Url: string,
    thumborPath: string,
  }),
});

export const tlogData = shape({
  id: number.isRequired,
  tag: string.isRequired,
  url: string.isRequired,
  userpic: shape({
    kind: string.isRequired,
    originalUrl: string,
    symbol: string,
  }).isRequired,
});

export const tlogEntry = shape({
  author: tlogData,
  canDelete: bool,
  canEdit: bool,
  canFavorite: bool,
  canModerate: bool,
  canReport: bool,
  canVote: bool,
  canWatch: bool,
  commentsCount: number.isRequired,
  id: number.isRequired,
  isFavorited: bool,
  isVoteable: bool,
  isWatching: bool,
  previewImage: shape({
    geometry: shape({
      height: number.isRequired,
      width: number.isRequired,
    }),
    url: string.isRequired,
  }),
  rating: object.isRequired,
  titleTruncated: string.isRequired,
  tlog: tlogData,
  type: string.isRequired,
  url: string.isRequired,
});
