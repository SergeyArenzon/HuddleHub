-- Example seed data for the tour service
-- Add your seed data here, for example:

-- Insert sample tours
INSERT INTO tour (id, name, description, price, created_at, updated_at)
VALUES 
    ('1', 'City Tour', 'Explore the city highlights', 50.00, NOW(), NOW()),
    ('2', 'Mountain Adventure', 'Hiking and nature experience', 75.00, NOW(), NOW());

-- Add more seed data as needed 