
CREATE TABLE IF NOT EXISTS users(
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    note TEXT NOT NULL,
    status TEXT NOT NULL,
    PRIMARY KEY(id)) WITHOUT ROWID

INSERT INTO users values(1234, "name", "something", 0)