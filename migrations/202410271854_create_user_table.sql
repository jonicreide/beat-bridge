-- +migrate Up
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT CHECK (name <> ''),
  email TEXT NOT NULL CHECK (email <> '') UNIQUE,
  image TEXT,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS user_email_idx ON users(email);

-- +migrate Down
DROP INDEX IF EXISTS user_email_idx;
DROP TABLE IF EXISTS users;
