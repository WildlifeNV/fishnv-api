SELECT
  mercury_advisories.id,
  species.species,
  fishable_waters.water_name,
  fishable_waters.region,
  fishable_waters.county,
  mercury_advisories.location_description,
  mercury_advisories.meals_per_month
FROM mercury_advisories
JOIN fishable_waters ON mercury_advisories.water_id = fishable_waters.id
JOIN species ON mercury_advisories.species_id = species.id
ORDER BY fishable_waters.region, fishable_waters.county, fishable_waters.water_name