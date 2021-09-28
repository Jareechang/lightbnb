SELECT properties.*, avg(property_review.rating) AS average_rating
FROM properties
INNER JOIN property_review ON (properties.id = property_review.property_id)
