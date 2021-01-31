"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Courses", {
      fields: ["facultyId"],
      type: "foreign key",
      name: "custom_fkey_constraint_courses",
      references: {
        //Required field
        table: "Faculties",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Courses", "facultyId", {});
  },
};
