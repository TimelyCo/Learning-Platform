const Course = require('../models/Course');
const Section = require('../models/Section');
const Unit = require('../models/Unit');
const Chapter = require('../models/Chapter');
const Question = require('../models/Question');
const UserProgress = require('../models/UserProgress');
// Get full course content with nested structure
exports.getCourseContent = async (req, res) => {
  try {
    const courseId = req.params.id;

    // ✅ Fetch course first
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // ✅ Then fetch sections
    const sections = await Section.find({ course: courseId });

    const sectionData = await Promise.all(
      sections.map(async (section) => {
        const units = await Unit.find({ section: section._id });

        const unitData = await Promise.all(
          units.map(async (unit) => {
            const chapters = await Chapter.find({ unit: unit._id });

            const chapterData = await Promise.all(
              chapters.map(async (chapter) => {
                const questions = await Question.find({ chapter: chapter._id });

                return {
                  _id: chapter._id,
                  title: chapter.title,
                  content: chapter.content,
                  questions,
                };
              })
            );

            return {
              _id: unit._id,
              title: unit.title,
              chapters: chapterData,
            };
          })
        );

        return {
          _id: section._id,
          title: section.title,
          units: unitData,
        };
      })
    );

    // ✅ Final response
    res.json({
      _id: course._id,
      title: course.title,
      description: course.description,
      sections: sectionData,
    });
  } catch (error) {
    console.error("Error in getCourseContent:", error);
    res.status(500).json({ message: error.message });
  }
};

// Save progress for a chapter
exports.saveChapterProgress = async (req, res) => {
  const { courseId, chapterId, score } = req.body;
  const userId = req.user._id;

  try {
    let progress = await UserProgress.findOne({ user: userId, course: courseId });

    if (!progress) {
      progress = new UserProgress({
        user: userId,
        course: courseId,
        completedChapters: [chapterId],
        scores: score ? [{ chapter: chapterId, score }] : [],
      });
    } else {
      if (!progress.completedChapters.includes(chapterId)) {
        progress.completedChapters.push(chapterId);
      }
      if (score !== undefined) {
        progress.scores.push({ chapter: chapterId, score });
      }
    }

    await progress.save();
    res.status(200).json({ message: 'Progress saved successfully', progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

