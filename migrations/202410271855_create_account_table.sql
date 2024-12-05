-- +migrate Up
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users (id) ON DELETE CASCADE,
  user_external_id TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT,
  id_token TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- +migrate Down
DROP TABLE IF EXISTS accounts;