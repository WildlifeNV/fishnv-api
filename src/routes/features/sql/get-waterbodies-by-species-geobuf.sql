SELECT st_asgeobuf(sq, 'geom') AS geobuf
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
) AS sq