const speciesObj = {
  id: { type: 'string' },
  species: { type: 'string' },
  abbr: { type: 'string' },
  scientific_name: { type: 'string' },
  min_trophy_weight: { type: 'number' },
  description: { type: 'string' }
}

const speciesParams = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'UUID of the species from the database.'
    }
  }
}

const speciesIdSchema = {
  description: 'Get a species by ID.',
  tags: ['species'],
  params: speciesParams,
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      properties: speciesObj
    }
  }
}

// fish entry objects needed for /species/:id/fish-entries

export {
  speciesObj,
  speciesParams,
  speciesIdSchema
}
