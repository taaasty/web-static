const CORRESPONDENCE_NORMALIZED_TABLE = {
  text: {
    title: 'data1',
    text: 'data2',
  },
  anonymous: {
    title: 'data1',
    text: 'data2',
  },
  image: {
    title: 'data2',
    imageUrl: 'imageUrl',
    imageAttachments: 'imageAttachments',
  },
  instagram: {
    title: 'data2',
    embedUrl: 'embedUrl',
    embedHtml: 'embedHtml',
  },
  music: {
    title: 'data2',
    embedUrl: 'embedUrl',
    embedHtml: 'embedHtml',
  },
  video: {
    title: 'data2',
    embedUrl: 'embedUrl',
    embedHtml: 'embedHtml',
  },
  quote: {
    source: 'data1',
    text: 'data2',
  },
};

export function normalize(entry) {
  const attrs = {
    id: entry.id,
    type: entry.type,
    privacy: entry.isPrivate ? 'private'
      : entry.isVoteable ? 'live'
      : 'public',
    pinOrderUrl: entry.orderUrl,
    pinState: entry.fixedState,
    pinnedTill: entry.fixedUpAt,
    updatedAt: new Date(entry.updatedAt).getTime(),
  };

  switch (entry.type) {
  case 'text':
  case 'anonymous':
    return Object.assign(attrs, {
      data1: entry.title,
      data2: entry.text,
    });
  case 'image':
    return Object.assign(attrs, {
      data2: entry.title,
      imageUrl: entry.imageUrl,
      imageAttachments: entry.imageAttachments,
    });
  case 'instagram':
  case 'music':
  case 'video':
    return Object.assign(attrs, {
      data2: entry.title,
      embedUrl: entry.iframely.url,
      embedHtml: entry.iframely.html,
    });
  case 'quote':
    return Object.assign(attrs, {
      data1: entry.source,
      data2: entry.text,
    });
  default:
    return attrs;
  }
}

export function getNormalizedKey(type, key) {
  const correspondingValues = CORRESPONDENCE_NORMALIZED_TABLE[type];
  return correspondingValues[key] || null;
}

export function getNormalizedEntryValue(entry, key) {
  return entry[getNormalizedKey(entry.type, key)] || null;
}
