'use strict';

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    cell_number: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    github_id: DataTypes.INTEGER,
    github_username: DataTypes.STRING,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {});
  
  Student.associate = function(models) {
    Student.belongsToMany(models.labs, {
        as: 'labs',
        through: 'assignments',
        foreignKey: 'student_id',
        otherKey: 'lab_id'
    });

    Student.hasMany(models.submissions, {
        as: "submissions",
        foreignKey: 'student_id'
    });

    Student.hasMany(models.comments, {
        as: "comments",
        foreignKey: 'student_id'
    });

    Student.hasMany(models.grades, {
        as: "grades",
        foreignKey: 'student_id'
    });
  }

  return Student;
};