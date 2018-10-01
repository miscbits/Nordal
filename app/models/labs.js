'use strict';

module.exports = (sequelize, DataTypes) => {
  const Labs = sequelize.define('labs', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    assigned_date: {
      type: DataTypes.DATE,
    },
    due_date: {
      type: DataTypes.DATE,
    }
  }, {});

  Labs.associate = function(models) {
    Labs.belongsToMany(models.students,
    {
      as: 'Students',
      through: 'assignments',
      foreignKey: 'lab_id',
      otherKey: 'student_id'
    });

    Labs.hasOne(models.submissions,
    {
      as: 'submission',
      foreignKey: 'submittable_id',
      scope: {
        submittable: 'lab'
      }
    });
  };

  return Labs;
};
