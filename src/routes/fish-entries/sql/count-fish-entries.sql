SELECT
  count(*) AS total
FROM fish_entries
JOIN species on fish_entries.species_id = species.id
$<where:raw>