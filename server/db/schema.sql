CREATE TABLE IF NOT EXISTS applications(     
    application_id UUID PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_keys(     
    auth_id UUID PRIMARY KEY,
    owner TEXT
);