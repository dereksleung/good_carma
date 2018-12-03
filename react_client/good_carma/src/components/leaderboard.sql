-- New Posters

SELECT users.first_name, users.screenname, users.avatar
  FROM users
  INNER JOIN posts ON posts.user_id = users.id
  WHERE posts.created_at > now() - interval '1 week' AND NOT EXISTS(
    SELECT users.first_name
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE posts.created_at <= now() - interval '1 week'
  )
  GROUP BY users.first_name
  ORDER BY posts.created_at DESC



User.includes(:posts).where({ created_at: (Time.now - 1.week)..Time.now.midnight }).references(:posts)



  -- (Done) But you still need to know if the user posted other posts before that.


