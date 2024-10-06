// Imports
const dataMapper = require("../data/dataMapper");

// Controller
const mainController = {
  renderHomePage: async (req, res) => {
    try {
      res.send("Hello World!");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },
  getBoardTitle: async (req, res) => {
    try {
      const title = await dataMapper.getTitle();
      res.send(title);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },
  changeBoardTitle: async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        res.status(400).send("Missing parameters");
      } else {
        const newTitle = await dataMapper.changeTitle(title);
        res.send(newTitle);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },
  getTasks: async (req, res) => {
    try {
      const tasks = await dataMapper.getAllTasks();
      res.send(tasks);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },
  createTask: async (req, res) => {
    try {
      const { name, category } = req.body; // Récupérer name et category
      console.log(name, category);
      if (!name || !category) {
        return res.status(400).send("Missing parameters");
      }
      // Créer une nouvelle tâche avec name et category
      const task = await dataMapper.createNewTask(name, category);
      res.send(task);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database:\n${error.message}`);
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).send("Missing parameters");
      }
      // Supprimer la tâche avec l'id donné
      const task = await dataMapper.deleteSelectedTask(id);
      res.send(task);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database:\n${error.message}`);
    }
  },
};

// Exports
module.exports = mainController;
