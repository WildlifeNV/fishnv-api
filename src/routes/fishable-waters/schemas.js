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
  water_records: {
    type: 'array',
    description: 'The largest fish of each species caught in this fishable water.',
    items: {
      type: 'object',
      description: 'A water record entry.',
      additionalProperties: false,
      properties: {
        species: {
          type: 'string',
          description: ''
        },
        fish_weight: {
          type: 'number',
          description: 'The weight, in ounces, of the fish.'
        },
        pounds: {
          type: 'integer',
          description: 'The pounds portion of the fish_weight. This + ounces = fish_weight.'
        },
        ounces: {
          type: 'integer',
          description: 'The ounces portion of the fish_weight. This + pounds = fish_weight.'
        }
      }
    }
  },
  fish_entries: {
    type: 'array',
    description: '',
    items: {
      type: 'object',
      description: '',
      additionalProperties: false,
      properties: {
        id: {
          type: 'string',
          description: 'The record ID for this fish entry.'
        },
        species_id: {
          type: 'string',
          description: 'The species ID for this entry.'
        },
        species: {
          type: 'string',
          description: 'The species of this entry.'
        },
        water_name: {
          type: 'string',
          description: 'The water this species was caught in.'
        },
        fish_weight: {
          type: 'number',
          description: 'The weight, in ounces, of the fish.'
        },
        pounds: {
          type: 'integer',
          description: 'The pounds portion of the fish_weight. This + ounces = fish_weight.'
        },
        ounces: {
          type: 'integer',
          description: 'The ounces portion of the fish_weight. This + pounds = fish_weight.'
        },
        angler_name: {
          type: 'string',
          description: 'The angler that caught this fish.'
        },
        angler_state: {
          type: 'string',
          description: 'The state the angler is from.'
        },
        year_caught: {
          type: 'integer',
          description: 'The year this entry was caught.'
        },
        record_rank: {
          type: 'integer',
          description: 'The rank of this entry based on the weight for this water. 1 = largest, n = smallest. Where n is the number of fish caught for this species and this water.'
        }
      }
    }
  },
  nearby_waters: {
    type: 'array',
    description: 'An array of nearby waters. The list of nearby waters is limited to 10 items or all the waters < 10 miles from the current water, whichever is shorter.',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        knn_water_id: {
          type: 'string',
          description: 'The id of the nearby water.'
        },
        knn_water_name: {
          type: 'string',
          description: 'The name of the nearby water.'
        },
        distance: {
          type: 'number',
          description: 'Distance (in miles) from the water of interest to the nearby water.'
        }
      }
    }
  },
  spatial_metadata: {
    type: 'object',
    description: 'Spatial metadata for the water.',
    additionalProperties: false,
    properties: {
      geometry_type: {
        type: 'string',
        description: 'The geometry type. From PostGIS ST_GeometryType function. Either ST_MultiPolygon or ST_MultiLineString.'
      },
      spatial_dimensions: {
        type: 'number',
        description: 'Either the area (square feet for ST_MultiPolygon) or length (feet for ST_MulitLineString) of the water.'
      },
      centroid: {
        type: 'array',
        description: 'Not the true centroid, but a point on the geometry.',
        maxItems: 2,
        items: { type: 'number' }
      },
      bbox: {
        type: 'object',
        description: 'The bounding box for the water. Formatted with the southwest corner and northeast corner.',
        additionalProperties: false,
        properties: {
          sw: {
            type: 'array',
            description: 'Coordinates of the southwest corner of the bounding box for the water.',
            maxItems: 2,
            items: { type: 'number' }
          },
          ne: {
            type: 'array',
            description: 'Coordinates of the northeast corner of the bounding box for the water.',
            maxItems: 2,
            items: { type: 'number' }
          }
        }
      }
    }
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
