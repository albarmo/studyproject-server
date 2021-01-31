const { Course } = require("../models/index");
const { uuid } = require("uuidv4");
const uploader = require("../helpers/uploader");

class CourseControllers {
  static addCourse(req, res) {
    let generateUUID = uuid();
    try {
      const upload = uploader("COURSE_IMAGE").fields([{ name: "image" }]);
      upload(req, res, (err) => {
        if (err) {
          console.log("gagal upload", err);
          return res.status(500).json({ msg: err });
        }
        const { image } = req.files;
        const imagePath = image ? "/" + image[0].filename : null;
        let inputDataCourse = {
          id: generateUUID,
          title: req.body.title,
          image: imagePath,
          video_src: req.body.video_src,
          pdf: req.body.pdf,
          challange: req.body.challange,
          facultyId: req.body.facultyId,
        };
        Course.create(inputDataCourse)
          .then((data) => {
            return res.status(201).json({ msg: "success created new course" });
          })
          .catch((error) => {
            return res.status(500).json({ msg: "error created course" });
          });
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  static async getAllCourse(req, res) {
    try {
      const courses = await Course.findAll();
      if (courses) {
        return res.status(200).json(courses);
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async updateCourse(req, res) {
    const idParams = req.params.id;
    let inputDataUpdateCourse = {
      id: idParams,
      title: req.body.title,
      image: req.body.image,
      video_src: req.body.video_src,
      pdf: req.body.pdf,
      challange: req.body.challange,
      facultyId: req.body.facultyId,
    };
    try {
      const findCourseById = await Course.findOne({
        where: {
          id: idParams,
        },
      });
      if (findCourseById) {
        const updateCourse = await Course.update(inputDataUpdateCourse, {
          where: { id: idParams },
        });
        if (updateCourse) {
          return res.status(200).json({ updated: updateCourse });
        }
      } else if (!findCourseById) {
        res.status(404).json({ msg: "course not found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteCourse(req, res) {
    const idCourse = req.params.id;
    try {
      const deleteCourse = await Course.destroy({ where: { id: idCourse } });
      return res
        .status(200)
        .json({ msg: `sucess deleted course ${deleteCourse}` });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = CourseControllers;
