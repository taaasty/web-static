import { PropTypes } from 'react';

const { any, bool, number, object, oneOf, shape, string } = PropTypes;

export const tlog = shape({
  id: number.isRequired,
  name: string.isRequired,
  slug: string.isRequired,
  design: object.isRequired,
  is_privacy: bool.isRequired,
  public_tlog_entries_count: number.isRequired,
  can_edit: bool,
  can_write: bool,
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
  reader_id: number,
  state: string,
  user_id: number,
});

const gender = oneOf(['f', 'm']);

export const heroUser = shape({
  gender,
  created_at: string.isRequired,
  features: shape({
    flows: bool.isRequired,
    notification: bool.isRequired,
    search: bool.isRequired,
  }),
  has_design_bundle: bool.isRequired,
  id: number.isRequired,
  is_daylog: bool,
  is_female: bool.isRequired,
  is_flow: bool.isRequired,
  is_premium: bool.isRequired,
  is_privacy: bool,
  locale: string.isRequired,
  name: string.isRequired,
  private_entries_count: number.isRequired,
  public_entries_count: number.isRequired,
  slug: string.isRequired,
  tag: string.isRequired,
  title: string,
  tlog_url: string.isRequired,
  total_entries_count: number.isRequired,
  updated_at: string.isRequired,
  userpic: shape({
    default_colors: shape({
      background: string,
      name: string,
    }),
    kind: string.isRequired,
    large_url: string,
    original_url: string,
    symbol: string,
    thumb128_url: string,
    thumb64_url: string,
    thumbor_path: string,
  }),
});

export const tlogData = shape({
  id: number.isRequired,
  tag: string.isRequired,
  url: string.isRequired,
  userpic: shape({
    kind: string.isRequired,
    original_url: string,
    symbol: string,
  }).isRequired,
});

export const tlogEntry = shape({
  author: tlogData,
  can_delete: bool,
  can_edit: bool,
  can_favorite: bool,
  can_moderate: bool,
  can_report: bool,
  can_vote: bool,
  can_watch: bool,
  comments_count: number.isRequired,
  id: number.isRequired,
  is_favorited: bool,
  is_voteable: bool,
  is_watching: bool,
  preview_image: shape({
    geometry: shape({
      height: number.isRequired,
      width: number.isRequired,
    }),
    url: string.isRequired,
  }),
  rating: object.isRequired,
  title_truncated: string.isRequired,
  tlog: tlogData,
  type: string.isRequired,
  url: string.isRequired,
});
