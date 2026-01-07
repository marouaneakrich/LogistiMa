// import Driver from "../models/Driver.js";


// export const createCourse = async (req, res) => {
//   try {
//     const { id_user, title, descreption, date_creation } = req.body;

//     const cours = await Cours.create({
//       id_user,
//       title,
//       descreption,
//       date_creation,
//     });
//     const newCourse = await Cours.create({
//       id_user,
//       title,
//       descreption,
//       date_creation,
//     });
//     res.status(201).json({
//       message: "Course created successfully",
//       cours,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getAllCours = async (req, res) => {
//   try {
//     const cours = await Cours.findAll();
//     res.json(cours);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getCoursById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const cours = await Cours.findByPk(id, {
//       include: {
//         model: Lesson,
//       },
//     });

//     if (!cours) {
//       return res.status(404).json({ message: "Cours not found" });
//     }

//     res.status(200).json(cours);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
