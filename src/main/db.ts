import { Database } from "../infra/config/datasource";

const db = new Database();

const getConnection = async () => {
  return db.getConnection();
};

const closeConnection = async () => {
  return db.closeConnection();
};

export { getConnection, closeConnection };
