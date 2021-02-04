CREATE TABLE IF NOT EXISTS applications(     
    application_id UUID PRIMARY KEY,
    name TEXT,
    status BOOL NOT NULL,
    cpu_usage DOUBLE PRECISION,
    ram_usage INT
);

CREATE TABLE IF NOT EXISTS logs(     
    log_id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    message TEXT NOT NULL,
    CONSTRAINT "logs_fk0" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id")
);

CREATE TABLE IF NOT EXISTS auth_keys(     
    auth_id UUID PRIMARY KEY,
    owner TEXT
);