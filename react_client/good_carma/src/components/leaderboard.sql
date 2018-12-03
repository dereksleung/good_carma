-- New Posters

  -- This is perfect.
  SELECT users.first_name, users.avatar, MIN(posts.created_at) AS first_post_date
  FROM users
  INNER JOIN posts ON posts.user_id = users.id
  WHERE posts.created_at > now() - interval '1 week' AND NOT EXISTS(
    SELECT users.first_name
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE posts.created_at <= now() - interval '1 week'
  )
  GROUP BY users.id

-- This allows you to order by posts.created_at, but also returns duplicate rows per user.
SELECT users.first_name, users.avatar, posts.created_at
  FROM users
  INNER JOIN posts ON posts.user_id = users.id
  WHERE posts.created_at > now() - interval '1 week' AND NOT EXISTS(
    SELECT users.first_name
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE posts.created_at <= now() - interval '1 week'
  )
  GROUP BY users.id, posts.created_at
  ORDER BY posts.created_at





User.includes(:posts).where({ created_at: (Time.now - 1.week)..Time.now.midnight }).references(:posts)
  -- (Done) But you still need to know if the user posted other posts before that.

-- Silver Users

SELECT users.first_name, users.avatar, COUNT(parent_post_id) AS Inspiractions
  FROM users
  INNER JOIN posts ON users.id = posts.user_id
  INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
  GROUP BY users.id
  HAVING COUNT(parent_post_id) > 1

