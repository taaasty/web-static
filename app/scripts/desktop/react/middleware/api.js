/*global fetch */
// shameless plagiarism

import { Schema, arrayOf, unionOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch'; // provides global.fetch
import {
  PRIVATE_CONVERSATION,
  PUBLIC_CONVERSATION,
  GROUP_CONVERSATION,
} from '../messaging/constants/ConversationConstants';

const tlogSchema = new Schema('tlog');
const appStatsSchema = new Schema('appStats');
const userSchema = new Schema('user');
const relSchema = new Schema(
  'rel',
  { idAttribute: (e) => `${e.userId}-${e.readerId}` }
);
const relCollSchema = new Schema('relColl');

const flowSchema = new Schema('flow');
const flowCollSchema = new Schema('flowColl');
const staffSchema = new Schema('staff');

const commentSchema = new Schema('comment');

const entrySchema = new Schema('entry');
const entryCollSchema = new Schema('entryColl');

const privateConversationSchema = new Schema('privateConversation');
const publicConversationSchema = new Schema('publicConversation');
const groupConversationSchema = new Schema('groupConversation');
const conversationMap = {
  [PRIVATE_CONVERSATION]: privateConversationSchema,
  [PUBLIC_CONVERSATION]: publicConversationSchema,
  [GROUP_CONVERSATION]: groupConversationSchema,
};

const notificationSchema = new Schema('notification');

const messageSchema = new Schema('message');
const messageCollSchema = new Schema('messageColl');

tlogSchema.define({
  author: userSchema,
});

staffSchema.define({
  user: userSchema,
});

flowSchema.define({
  staffs: arrayOf(staffSchema),
});

relSchema.define({
  user: userSchema,
});

flowCollSchema.define({
  items: arrayOf({
    flow: flowSchema,
    relationship: relSchema,
  }),
});

commentSchema.define({
  user: userSchema,
});

entrySchema.define({
  author: userSchema,
  commentator: userSchema,
  comments: arrayOf(commentSchema),
  tlog: tlogSchema,
});

entryCollSchema.define({
  items: arrayOf({
    entry: entrySchema,
    commentator: userSchema,
  }),
});

relCollSchema.define({
  relationships: arrayOf(relSchema),
});

messageSchema.define({
  author: userSchema,
  recipient: userSchema,
});

messageCollSchema.define({
  messages: arrayOf(messageSchema),
});

privateConversationSchema.define({
  lastMessage: messageSchema,
  recipient: userSchema,
});

publicConversationSchema.define({
  lastMessage: messageSchema,
  users: arrayOf(userSchema),
});

groupConversationSchema.define({
  lastMessage: messageSchema,
  users: arrayOf(userSchema),
});

const conversationSchema = unionOf(
  conversationMap,
  { schemaAttribute: 'type' }
);

notificationSchema.define({
  sender: userSchema,
});

export const Schemas = {
  TLOG: tlogSchema,
  FLOW: flowSchema,
  FLOW_COLL: flowCollSchema,
  ENTRY: entrySchema,
  ENTRY_COLL: entryCollSchema,
  APP_STATS: appStatsSchema,
  USER: userSchema,
  USER_COLL: arrayOf(userSchema),
  RELATIONSHIP: relSchema,
  RELATIONSHIP_COLL: relCollSchema,
  CONVERSATION: conversationSchema,
  CONVERSATION_COLL: arrayOf(conversationSchema),
  MESSAGE: messageSchema,
  MESSAGE_COLL: messageCollSchema,
  MESSENGER_READY: {
    conversations: arrayOf(conversationSchema),
    notifications: arrayOf(notificationSchema),
  },
};

export const CALL_API = Symbol('Call API');

function callApi(endpoint, opts, schema) {
  return fetch(endpoint, opts)
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return Object.assign(
        {},
        normalize(camelizedJson, schema)
      );
    });
}

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

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, opts, schema).then(
    (response) => next(actionWith({
      response,
      type: successType,
    })),
    (error) => next(actionWith({
      error,
      type: failureType,
    }))
  );
}
