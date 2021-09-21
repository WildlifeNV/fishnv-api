/* eslint-disable camelcase */
// /fishable-waters schema
const fishableWatersQuerystringProps = {
  species: {
    type: 'string',
    description:
      'The name of the species to search for. Must be the exact name.',
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
  water_type: {
    type: 'string',
    description:
      'The type of water to search for, e.g. stream, urban water, etc.',
    enum: [
      'creek or stream',
      'lake or reservoir',
      'river',
      'urban fishery'
    ]
  },
  region: {
    type: 'string',
    description:
      'The NDOW region used to limit the waters returned from the database',
    enum: ['Eastern', 'Western', 'Southern']
  },
  county: {
    type: 'string',
    description:
      'The Nevada county to limit the waters returned from the database',
    enum: [
      'Carson City',
      'Churchill',
      'Clark',
      'Douglas',
      'Elko',
      'Esmeralda',
      'Eureka',
      'Humboldt',
      'Lander',
      'Lincoln',
      'Lyon',
      'Mineral',
      'Nye',
      'Pershing',
      'Storey',
      'Washoe',
      'White Pine'
    ]
  },
  s: {
    type: 'string',
    description:
      'A search term or phrase for full text search of fishable waters'
  }
}

const fishableWatersResponseProps = {
  id: { type: 'string' },
  water_name: { type: 'string' },
  label: { type: 'string' },
  region: { type: 'string' },
  county: { type: 'string' },
  water_type: { type: 'string' },
  species: {
    type: 'array',
    items: { type: 'string' }
  },
  coordinates: {
    type: 'array',
    items: { type: 'number' }
  }
}

const fishableWatersSchema = {
  description: 'Get all the fishable waters in Nevada, or a subset using the query string parameters.',
  tags: ['fishable-waters'],
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: fishableWatersQuerystringProps
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: fishableWatersResponseProps
      }
    }
  }
}

// /fishable-waters/:id schema
const fishableWatersIdParams = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'An UUID for a fishable water.'
    }
  }
}

const fishableWatersIdResponseProps = {
  id: { type: 'string' },
  water_name: { type: 'string' },
  label: { type: 'string' },
  region: { type: 'string' },
  county: { type: 'string' },
  species: {
    type: 'array',
    items: { type: 'string' }
  },
  geojson: {
    description: 'A Line, Multiline geojson object if the water_type is a linear feature. A Polygon, or MultiPolygon if the water_type is a water body feature.',
    type: 'object',
    properties: {
      type: { type: 'string' },
      coordinates: { type: 'array' }
    },
    additionalProperties: false
  }
}

const fishableWatersIdSchema = {
  description: 'Get a fishable water by its ID.',
  tags: ['fishable-waters'],
  params: fishableWatersIdParams,
  response: {
    200: {
      description: 'Data realted to an individual fishable water.',
      type: 'object',
      additionalProperties: false,
      properties: fishableWatersIdResponseProps
    }
  }
}

// /fishable-waters/:id/water-records schema
const fishableWaters_id_waterRecords = {
  description: 'Get record fish entries for a by fishable water ID.',
  tags: ['fishable-waters'],
  params: fishableWatersIdParams
}

export {
  fishableWatersSchema,
  fishableWatersIdSchema,
  fishableWaters_id_waterRecords
}
