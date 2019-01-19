SELECT users.first_name || ' ' || users.last_name AS full_name, users.avatar, DATE_TRUNC('days', MIN(AGE(now(),posts.created_at))) AS first_post_date
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        WHERE (posts.created_at > now() - interval '1 week') AND NOT EXISTS(
          SELECT users.first_name, MIN(posts.created_at)
          FROM users
          INNER JOIN posts ON posts.user_id = users.id
			GROUP BY users.id
			HAVING MIN(posts.created_at) <= now() - interval '1 week'