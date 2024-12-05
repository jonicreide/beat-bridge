-- +migrate Up

CREATE TABLE IF NOT EXISTS integration (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users (id) ON DELETE CASCADE,
  access_token TEXT NOT NULL CHECK(access_token <> ''),
  refresh_token TEXT NOT NULL CHECK(refresh_token <> ''),
  expires_at INTEGER NOT NULL,
  provider TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- +migrate Down
DROP TABLE IF EXISTS integration;