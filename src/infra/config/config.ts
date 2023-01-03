export const conf = {
  DB_NAME: process.env.POSTGRES_DATABASE,
  DB_TYPE: "postgres",
  DB_HOST: process.env.POSTGRES_HOST,
  DB_PORT: process.env.POSTGRES_PORT || "5432",
  DB_USER: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.POSTGRES_PASSWORD,
};
