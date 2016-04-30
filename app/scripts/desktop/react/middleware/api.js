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

const flowItemSchema = unionOf({
  flow: flowSchema,
  relationship: relSchema,
});

flowCollSchema.define({
  items: arrayOf(flowItemSchema),
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

const entryItemSchema = unionOf({
  entry: entrySchema,
  commentator: userSchema,
});

entryCollSchema.define({
  items: arrayOf(entryItemSchema),
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
  MESSENGER_READY: unionOf({
    conversations: arrayOf(conversationSchema),
    notifications: arrayOf(notificationSchema),
  }),
};

export const CALL_API = Symbol('Call API');

function callApi(endpoint, schema) {
  return fetch(endpoint)
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

  let { endpoint, body } = callAPI;
  const { types, schema } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL');
  }

  if (typeof body === 'function') {
    body = body(store.getState());
  }

  if (typeof body !== 'undefined' && (
      typeof body !== 'string' || !(body instanceof FormData))) {
    throw new Error('Expected body to be a string or FormData object');
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

  return callApi(endpoint, schema).then(
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
