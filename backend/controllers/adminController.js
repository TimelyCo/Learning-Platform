const Course = require('../models/Course');
const Section = require('../models/Section');
const Unit = require('../models/Unit');
const Chapter = require('../models/Chapter');


exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = await Course.create({ title, description });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createSection = async (req, res) => {
  const { courseId, title } = req.body;
  try {
    const section = await Section.create({ course: courseId, title });
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createUnit = async (req, res) => {
  const { sectionId, title } = req.body;
  try {
    const unit = await Unit.create({ section: sectionId, title });
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createChapter = async (req, res) => {
  const { unitId, title, content } = req.body;
  try {
    const chapter = await Chapter.create({ unit: unitId, title, content });
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
