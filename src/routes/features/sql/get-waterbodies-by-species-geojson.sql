SELECT
  json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(st_asGeoJSON(sq)::json)
  )::json AS geojson
FROM (
  SELECT
    fishable_waters.id,
    fishable_waters.label,
    fishable_waters.county,
    fishable_waters.region,
    fishable_waters.water_name,
    fishable_waters.water_type,
    fishable_waters.geom
  FROM fishable_waters
  JOIN species_water_joiner ON fishable_waters.id = species_water_joiner.water_id
  WHERE species_water_joiner.species_id = $<id>
) as sq