SELECT
  mercury_advisories.id,
  mercury_advisories.water_id,
  mercury_advisories.species_id,
  species.species,
  fishable_waters.water_name,
  mercury_advisories.location_description,
  mercury_advisories.meals_per_month
FROM mercury_advisories
JOIN fishable_waters ON mercury_advisories.water_id = fishable_waters.id
JOIN species ON mercury_advisories.species_id = species.id
WHERE mercury_advisories.water_id = $<id>
ORDER BY species.species