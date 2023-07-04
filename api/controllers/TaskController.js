module.exports = {
  create: async function (req, res) {
    try {
      const { title, description, status } = req.body;
      if (!title) {
        return res.badRequest({ err: 'Title is required' });
      }

      const task = await Task.create({ title, description, status }).fetch();

      if (!task) {
        return res.serverError({
          err: 'Something went wrong',
        });
      }

      return res.ok({
        message: 'Task created successfully',
        data: task,
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
      });
    }
  },

  get: async function (req, res) {
    try {
      const tasks = await Task.find();
      return res.ok({
        message: 'Task fetched successfully',
        data: tasks,
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
      });
    }
  },

  getOne: async function (req, res) {
    try {
      const { id } = req.allParams();
      if (!id) {
        return res.badRequest({ err: 'Id is required' });
      }

      const task = await Task.findOne({ id });
      if (!task) {
        return res.notFound({ err: 'Task not found' });
      }

      return res.ok({
        message: 'Task fetched successfully',
        data: task,
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
      });
    }
  },

  update: async function (req, res) {
    try {
      const { id } = req.allParams();
      const { title, description, status } = req.body;
      if (!id) {
        return res.badRequest({ err: 'Id is required' });
      }

      const task = await Task.update(
        { id },
        { title, description, status }
      ).fetch();
      if (!task) {
        return res.notFound({ err: 'Task not found' });
      }

      return res.ok({
        message: 'Task updated successfully',
        data: task,
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
      });
    }
  },

  delete: async function (req, res) {
    try {
      const { id } = req.allParams();
      if (!id) {
        return res.badRequest({ err: 'Id is required' });
      }

      const task = await Task.destroy({ id });
      if (!task) {
        return res.notFound({ err: 'Task not found' });
      }

      return res.ok({
        message: 'Task deleted successfully',
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
      });
    }
  },
};
