SELECT
    id,
    water_name,
    ROUND((st_distance(
        st_transform(geom, 26911),
        (
            select distinct st_transform(geom, 26911)
            from fishable_waters
            where id = $<id>
        )
    ) / 1609.344)::numeric, 2) as distance
FROM fishable_waters
WHERE id != $<id> 
order by
    geom <-> (
        select distinct geom
        from fishable_waters
        where id = $<id>
    )
limit 10;