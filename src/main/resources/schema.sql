CREATE TABLE IF NOT EXISTS men (
    id INTEGER PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    comments_count INTEGER NOT NULL,
    country VARCHAR(56) NOT NULL,
    signed_up DATE NOT NULL,
    rating REAL NOT NULL,
    rated_times INTEGER NOT NULL
);
