import { Sequelize, DataTypes } from 'sequelize';

// Using postgreSQL DBMS
const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING, {
  logging: false,
});

// Define models 

const Role = sequelize.define('role', {
  id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
  },
}, {
  timestamps: false 
  // timestamps: false is gonna exclude ['createdAt', 'updatedAt' columns]
});

const Permission = sequelize.define('permission', {
  id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true    
  },
  roleId: {              // "roleId" is a foreign key to the <schema>.roles table
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true    
  }
}, {
  timestamps: false
});

const Plan = sequelize.define('plan', {
  id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
  },
}, {
  timestamps: false
});

const User = sequelize.define('user', {
  // columns you need,
  roleId: { // foreign key
      type: DataTypes.STRING,
      allowNull: false
  },
  planId: { //foreign key
      type: DataTypes.STRING,
      allowNull: false
  }
});

const Subscription = sequelize.define('subscription', {
  // all the columns you need,
  planId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
  }
}, {
  timestamps: false
});

// Declare associations

User.belongsTo(Role);
User.belongsTo(Plan);
Plan.hasMany(User);
Role.hasMany(User);
Role.hasMany(Permission);
Permission.belongsTo(Role);
Plan.hasMany(Subscription);
Subscription.belongsTo(Plan);

// Query relationships between tables

const user = await User.findOne({
  where: {
    id: '$someId',
  },
  include: [
    {
      model: Role,
      include: [
        {
          model: Permission
        }
      ]
    },
    {
      model: Plan,
      include: [
        {
          model: Subscription
        }
      ]
    }
  ]
});


