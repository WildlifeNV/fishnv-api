SELECT
  id,
  water_name,
  counties,
  regions,
  water_type,
  species,
  coordinates
FROM fishable_waters_feed
$<where:raw>