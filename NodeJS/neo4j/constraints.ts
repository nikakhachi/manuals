import { neo4jQuery } from './index';

// DROP UNIQUE CONSTRAINT
neo4jQuery(`
    DROP CONSTRAINT ON (node:<label_name>)
    ASSERT node.<property_name> IS UNIQUE
`);

//CREATE UNIQUE CONSTRAINT
neo4jQuery(`
    CREATE CONSTRAINT constraint_name IF NOT EXISTS FOR (node:<label_name>) 
    REQUIRE node.<property_name> IS UNIQUE
`);