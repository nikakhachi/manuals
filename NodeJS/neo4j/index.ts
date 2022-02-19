import neo4j, { Session, QueryResult, Driver } from "neo4j-driver";

const driver: Driver = neo4j.driver(process.env.NEO4J_SERVER, neo4j.auth.basic(process.env.NEO4J_NAME, process.env.NEO4J_PASSWORD));

const neo4jQuery = async (query) => {
  const session: Session = driver.session({ database: "neo4j" });
  const data: QueryResult = await session.run(query);
  await session.close();
  return data;
};

module.exports = { neo4jQuery, driver };
