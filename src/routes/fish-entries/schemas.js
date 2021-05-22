/* eslint-disable camelcase */
const fishEntriesQuerystringProps = {
  species: {
    type: 'string',
    description: 'The exact name of a species to filter the returned fish entries.',
    enum: [
      'white bass',
      'largemouth bass',
      'smallmouth bass',
      'spotted bass',
      'striped bass',
      'carp',
      'bullhead catfish',
      'channel catfish',
      'white catfish',
      'black crappie',
      'white crappie',
      'yellow perch',
      'kokanee salmon',
      'bluegill sunfish',
      'green sunfish',
      'pumpkinseed',
      'redear sunfish',
      'brook trout',
      'brown trout',
      'bull trout',
      'mackinaw trout',
      'rainbow trout',
      'bowcutt trout',
      'tiger trout',
      'walleye',
      'wiper',
      'lahontan cutthroat trout',
      'bonneville cutthroat trout',
      'redband trout',
      'tiger muskie',
      'yellowstone cutthroat trout',
      'mountain whitefish',
      'Sacramento perch'
    ]
  },
  species_id: {
    type: 'string',
    description: 'The UUID of a species to filter the returned fish entries. If species and species_id are both provided, species_id take precedent.'
  },
  water_id: {
    type: 'string',
    description: 'The UUID of a fishable water to filter the returned fish entries.'
  },
  page: {
    type: 'integer',
    minimum: 0
  },
  per_page: {
    type: 'integer',
    minimum: 0,
    maximum: 75
  }
}

const fishEntryItem = {
  id: { type: 'string' },
  species_id: { type: 'string' },
  species: { type: 'string' },
  water_id: { type: 'string' },
  water_name: { type: 'string' },
  date_caught: { type: 'string' },
  pounds: { type: 'integer' },
  ounces: { type: 'integer' },
  fish_weight: { type: 'integer' },
  fish_length: { type: 'number' },
  angler_name: { type: 'string' },
  angler_state: { type: 'string' },
  trophy_classification: { type: 'string' }
}

const fishEntries = {
  description: 'Get all the trophy fish entries in Nevada, or subset using query string parameters.',
  tags: ['fish-entries'],
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: fishEntriesQuerystringProps
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: fishEntryItem
          }
        },
        page: { type: 'integer' },
        per_page: { type: 'integer' },
        total_records: { type: 'integer' }
      }
    }
  }
}

export {
  fishEntries
}
