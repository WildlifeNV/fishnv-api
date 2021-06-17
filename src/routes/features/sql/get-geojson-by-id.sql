SELECT 
  json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(st_asgeojson(sq, 'geom', 5)::jsonb)
  )::jsonb AS geojson
FROM (
  SELECT *
  FROM $<table:name> AS t
  WHERE t.id = $<id>
) AS sq