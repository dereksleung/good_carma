-- Setting the weekly badge date using PostgreSQL

SELECT TO_CHAR(NOW() - INTERVAL '1 week', 'Mon DD YY') || ' - ' || TO_CHAR(NOW(), 'Mon DD YY')

-- Trailblazers

-- Attempt at subquery - says that subquery has too many columns, error after IN.
-- ERROR:  subquery has too many columns
-- LINE 3:   WHERE users.id IN (SELECT users.id, COUNT(parent_post_id) ...
--                          ^
-- SQL state: 42601
-- Character: 91 
  SELECT users.first_name, users.avatar, users.id
    FROM users
		WHERE users.id 
    IN (SELECT users.id, COUNT(parent_post_id) AS Inspiractions
        FROM users
        INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
        WHERE post_relations.created_at > now() - interval '1 week'
        GROUP BY users.id
        ORDER BY COUNT(parent_post_id) DESC
		    LIMIT 5
    )


-- Muses - Most Inspires this week
 SELECT users.first_name || ' ' || users.last_name, users.avatar, users.id AS user_id, COUNT(inspires.id) AS Inspires
    FROM users
    INNER JOIN inspires ON users.id = inspires.user_id
    INNER JOIN posts ON (posts.id = inspires.inspiring_entry_id AND inspiring_entry_type = 'Post')
    WHERE inspires.created_at > now() - interval '1 week'
    GROUP BY users.id
    ORDER BY COUNT(inspires.id) DESC
    LIMIT 5

-- This gets the inspires per post for each post with the highest inspire count.

    SELECT users.first_name || ' ' || users.last_name, users.avatar, users.id AS user_id, posts.id AS post_id, COUNT(inspires.id) AS Inspires
    FROM users
    INNER JOIN inspires ON users.id = inspires.user_id
    INNER JOIN posts ON (posts.id = inspires.inspiring_entry_id AND inspiring_entry_type = 'Post')
    WHERE inspires.created_at > now() - interval '1 week'
    GROUP BY users.id, posts.id
    ORDER BY COUNT(inspires.id) DESC
    LIMIT 5