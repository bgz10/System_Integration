CREATE TABLE IF NOT EXISTS users(
    id TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY(id)) WITHOUT ROWID


DROP TABLE users
