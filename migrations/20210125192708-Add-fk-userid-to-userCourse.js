"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addConstraint("User_Courses", {
        fields: ["UserId"],
        type: "foreign key",
        name: "custom_fkey_constraint_userid",
        references: {
          //Required field
          table: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .then(() => {
        return queryInterface.addConstraint("User_Courses", {
          fields: ["CourseId"],
          type: "foreign key",
          name: "custom_fkey_constraint_courseid",
          references: {
            //Required field
            table: "Courses",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint("User_Courses", "UserId", {}),
      queryInterface.removeConstraint("User_Courses", "CourseId", {}),
    ]);
  },
};
