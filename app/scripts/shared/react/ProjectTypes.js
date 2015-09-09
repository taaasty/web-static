import { PropTypes } from 'react';

export const flow = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  design: PropTypes.object.isRequired,
  is_privacy: PropTypes.bool.isRequired,
  public_tlog_entries_count: PropTypes.number.isRequired,
  can_edit: PropTypes.bool,
  can_write: PropTypes.bool,
})

// TODO: specify required fields and type of position field
export const relationship = PropTypes.shape({
  id: PropTypes.number,
  position: PropTypes.any,
  reader_id: PropTypes.number,
  state: PropTypes.string,
  user_id: PropTypes.number,
})
