/*global fetch */
import { Schema, arrayOf, unionOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch'; // provides global.fetch
import NoticeService from '../services/Notice';

const tlogSchema = new Schema('tlog');
const relSchema = new Schema(
  'rel', { idAttribute: (e) => `${e.userId}-${e.readerId}` }
);
const ratingSchema = new Schema('rating', { idAttribute: 'entryId' });
const permissionSchema = new Schema('permission', { idAttribute: 'entryId' });

const calendarSchema = new Schema('calendar', { idAttribute: 'tlogId' });

const flowSchema = new Schema('flow');
const flowCollItemSchema = new Schema(
  'flowCollItem', { idAttribute: (el) => el.flow.id }
);
const staffSchema = new Schema('staff');

const commentSchema = new Schema('comment');

const adsSchema = new Schema('ads');

const entrySchema = new Schema('entry');
const entryCollItemSchema = new Schema(
  'entryCollItem', { idAttribute: (el) => el.entry.id }
);

const conversationSchema = new Schema('conversation');
const conversationEntrySchema = new Schema('conversationEntry');

const notificationSchema = new Schema('notification');
const messageSchema = new Schema('message', { idAttribute: 'uuid' });

tlogSchema.define({
  author: tlogSchema,
  myRelationshipObject: relSchema,
});

staffSchema.define({
  user: tlogSchema,
});

flowSchema.define({
  staffs: arrayOf(staffSchema),
});

relSchema.define({
  flow: flowSchema,
  reader: tlogSchema,
  reverseRelationship: relSchema,
  user: tlogSchema,
});

flowCollItemSchema.define({
  flow: flowSchema,
  relationship: relSchema,
});

commentSchema.define({
  user: tlogSchema,
});

entrySchema.define({
  author: tlogSchema,
  commentator: tlogSchema,
  comments: arrayOf(commentSchema),
  rating: ratingSchema,
  tlog: tlogSchema,
});

entryCollItemSchema.define({
  entry: entrySchema,
  commentator: tlogSchema,
});

messageSchema.define({
  author: tlogSchema,
  recipient: tlogSchema,
  replyMessage: messageSchema,
});

conversationSchema.define({
  admin: tlogSchema,
  entry: conversationEntrySchema,
  lastMessage: messageSchema,
  recipient: tlogSchema,
  users: arrayOf(tlogSchema),
});

conversationEntrySchema.define({
  author: tlogSchema,
});

const entity = unionOf({
  'comment': commentSchema,
  'relationship': relSchema,
  'entry': entrySchema,
}, {
  schemaAttribute: (entity) => {
    if (!entity) {
      return null;
    }
    // Comment, Relationship, Authentication, Entry, Order
    if (entity.hasOwnProperty('readerId')) {
      return 'relationship';
    } else if (entity.hasOwnProperty('isVoteable')) {
      return 'entry';
    } else if (entity.hasOwnProperty('commentHtml')) {
      return 'comment';
    }
  },
});

notificationSchema.define({
  entity,
  sender: tlogSchema,
  senderRelation: relSchema,
});

export const Schemas = {
  NONE: {},
  ADS_COLL: arrayOf(adsSchema),
  TLOG: tlogSchema,
  TLOG_COLL: arrayOf(tlogSchema),
  CALENDAR: calendarSchema,
  FLOW: flowSchema,
  FLOW_COLL: { items: arrayOf(flowCollItemSchema) },
  STAFF: staffSchema,
  ENTRY: entrySchema,
  ENTRY_COLL: { items: arrayOf(entryCollItemSchema) },
  COMMENT: commentSchema,
  COMMENT_COLL: { comments: arrayOf(commentSchema) },
  COMMENT_COLL_ARR: arrayOf({ comments: arrayOf(commentSchema) }),
  RATING: ratingSchema,
  RATING_ARR: arrayOf(ratingSchema),
  PERMISSION: permissionSchema,
  PERMISSION_ARR: arrayOf(permissionSchema),
  RELATIONSHIP: relSchema,
  RELATIONSHIP_COLL: { relationships: arrayOf(relSchema) },
  RELATIONSHIP_ARR: arrayOf(relSchema),
  PEOPLE_COLL: arrayOf({ user: tlogSchema }),
  CONVERSATION: conversationSchema,
  CONVERSATION_COLL: arrayOf(conversationSchema),
  MESSAGE: messageSchema,
  MESSAGE_COLL: { messages: arrayOf(messageSchema) },
  MESSAGE_ARR: arrayOf(messageSchema),
  MESSENGER_READY: {
    conversations: arrayOf(conversationSchema),
    notifications: arrayOf(notificationSchema),
  },
  NOTIFICATION: notificationSchema,
  NOTIFICATION_ARR: arrayOf(notificationSchema),
  NOTIFICATION_COLL: {
    notifications: arrayOf(notificationSchema),
  },
};

export const CALL_API = Symbol('Call API');

export function prepareResponse(json, schema) {
  return Object.assign({},
    normalize(camelizeKeys(json), schema)
  );
}

function callApi(endpoint, opts, schema) {
  return fetch(endpoint, opts)
    .then((response) => response.json()
      .then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (typeof json !== 'object') {
        json = {};
      }

      if (!response.ok) {
        NoticeService.errorResponse(json);
        return Promise.reject(json);
      }

      return prepareResponse(json, schema);
    });
}

// shameless plagiarism

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return (next(action));
  }

  let { endpoint, opts } = callAPI;
  const { types, schema } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL');
  }

  if (typeof opts === 'function') {
    opts = opts(store.getState());
  }

  if (typeof opts !== 'undefined' &&
    typeof opts !== 'string' &&
    typeof opts !== 'object') {
    throw new Error('Expected opts to be a string or an object');
  }

  if (!schema) {
    throw new Error('Specify exact Schema for the request');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types');
  }

  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, opts, schema)
    .then(
      (response) => next(actionWith({
        response,
        type: successType,
      })),
      (error) => Promise.reject(next(actionWith({
        error,
        type: failureType,
      })))
    );
};
