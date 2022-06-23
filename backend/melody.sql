\echo 'Delete and recreate melody db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE melody;
CREATE DATABASE melody;
\connect melody

\i melody-schema.sql
\i melody-seed.sql

\echo 'Delete and recreate melody_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE melody_test;
CREATE DATABASE melody_test;
\connect melody_test

\i melody-schema.sql
