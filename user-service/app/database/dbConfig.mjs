import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

let sequelize;

const connectToDatabase = async () => {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: PostgresDialect,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      ssl: true,
      clientMinMessages: "notice",
    });

    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    return sequelize;
  }
};

const closeConnection = async () => {
  if (sequelize) {
    try {
      await sequelize.close();
      console.log("Connection closed.");
      sequelize = null;
    } catch (error) {
      console.error("Error closing the connection:", error);
    }
  }
};

export { connectToDatabase, closeConnection };
