// Imports
const client = require("./database");

// DataMapper
const dataMapper = {
  async getTitle() {
    const query = {
      text: "SELECT name FROM title",
    };
    const result = await client.query(query);
    return result.rows;
  },
  async changeTitle(newTitle) {
    const query = {
      text: "UPDATE title SET name = $1 RETURNING *",
      values: [newTitle],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
  async getAllTasks() {
    const query = {
      text: "SELECT * FROM tasks",
    };
    const result = await client.query(query);
    return result.rows;
  },
  async createNewTask(name, category) {
    const query = {
      text: "INSERT INTO tasks (name, category) VALUES ($1, $2) RETURNING *",
      values: [name, category],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
  async deleteTask(id) {
    const query = {
      text: "DELETE FROM tasks WHERE id = $1 RETURNING *",
      values: [id],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
};

// Exports
module.exports = dataMapper;
