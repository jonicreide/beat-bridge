-- +migrate Up

CREATE TABLE IF NOT EXISTS playlist (
  id TEXT PRIMARY KEY,
  integration_id TEXT REFERENCES integration(id) ON DELETE CASCADE,
  external_id TEXT NOT NULL,
  thumbnail TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS playlist_fk_integration_id ON playlist(id);

-- +migrate Down

DROP INDEX IF EXISTS playlist_fk_integration_id;
DROP TABLE IF EXISTS playlist;