import { Sequelize, ARRAY, STRING, JSON, NUMBER, DATE } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING, {
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to PostgreSQL:", err);
  });

const schema = sequelize.define("tableName", {
  rootCompanies: {
    type: ARRAY(STRING),
    allowNull: false,
  },
  updatedProperty: {
    type: STRING,
    allowNull: false,
  },
  notifications: {
    type: JSON,
    defaultValue: {
      enabled: false,
      email: "",
      phone: "",
      timeRange: "anytime",
      nodes: ["*"],
    },
  },
  age: {
    type: NUMBER,
    allowNull: false,
  },
  validThru: {
    type: DATE,
    allowNull: false,
  },
});

// Find
await schema.findOne({
  where: {
    email: req.body.email,
  },
});

// Create
await schema.create({
  email,
  password: hashedPassword,
  companyId,
  role,
  status: "pending",
  notifications: {
    enabled: false,
    email: email,
    phone: "",
    timeRange: "anytime",
    nodes: ["*"],
  },
});
