-- +migrate Up
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users (id) ON DELETE CASCADE,
  session_token TEXT,
  expires TIMESTAMPTZ
);

-- +migrate Down
DROP TABLE IF EXISTS sessions;