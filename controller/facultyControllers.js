const { Faculty } = require("../models/index");
const { uuid } = require("uuidv4");

class facultyControllers {
  static async addFaculty(req, res) {
    let generateUUID = uuid();
    let inputDataFaculty = {
      id: generateUUID,
      name: req.body.name,
    };
    try {
      const createFaculty = await Faculty.create(inputDataFaculty, {
        returning: true,
        plain: true,
      });
      res.status(201).json({ createFaculty });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllFaculty(req, res) {
    try {
      const Facultys = await Faculty.findAll();
      if (Facultys) {
        return res.status(200).json(Facultys);
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async updateFaculty(req, res) {
    const idParams = req.params.id;
    let inputDataUpdateFaculty = {
      id: idParams,
      name: req.body.name,
    };
    try {
      const findFacultyById = await Faculty.findOne({
        where: {
          id: idParams,
        },
      });
      if (findFacultyById) {
        const updateFaculty = await Faculty.update(inputDataUpdateFaculty, {
          where: { id: idParams },
        });
        if (updateFaculty) {
          return res.status(200).json({ updated: updateFaculty });
        }
      } else if (!findFacultyById) {
        res.status(404).json({ msg: "Faculty not found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deletFaculty(req, res) {
    const idFaculty = req.params.id;
    try {
      const deleteFaculty = await Faculty.destroy({ where: { id: idFaculty } });
      return res
        .status(200)
        .json({ msg: `sucess deleted Faculty ${deleteFaculty}` });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = facultyControllers;
