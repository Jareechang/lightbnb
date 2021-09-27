SELECT *
FROM reservations
INNER JOIN properties
ON (reservations.property_id = properties.id)
WHERE guest_id = $1
ORDER BY start_date DESC;
