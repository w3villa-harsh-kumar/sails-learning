// console.log(_);

module.exports = {
  create: async function (req, res) {
    try {
      const { title, description, status } = req.body;
      if (!title) {
        return res.badRequest({ err: 'Title is required', status: 'error' });
      }

      const task = await Task.create({ title, description, status }).fetch();

      if (!task) {
        return res.serverError({
          err: 'Something went wrong',
          status: 'error',
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
        status: 'error',
      });
    }
  },

  get: async function (req, res) {
    try {
      const { sort, status } = req.query;

      let tasks = await Task.find();

      // sort by createdAt
      tasks = _.sortBy(tasks, 'createdAt');

      // sorting
      if (sort) {
        if (sort.charAt(0) === '-') {
          tasks = _.sortBy(tasks, sort.substring(1)).reverse();
        } else {
          tasks = _.sortBy(tasks, sort);
        }
      }

      // filtering
      if (status) {
        tasks = _.filter(tasks, { status });
      }

      // pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const pages = _.ceil(tasks.length / limit);
      tasks = _.slice(tasks, startIndex, endIndex);

      return res.ok({
        message: 'Task fetched successfully',
        data: tasks,
        status: 'success',
        taskPerPage: limit,
        totalPages: pages,
        currentPage: page,
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
        status: 'error',
      });
    }
  },

  getOne: async function (req, res) {
    try {
      const { id } = req.allParams();
      if (!id) {
        return res.badRequest({ err: 'Id is required', status: 'error' });
      }

      const task = await Task.findOne({ uuid: id });
      if (!task) {
        return res.notFound({ err: 'Task not found', status: 'error' });
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
        status: 'error',
      });
    }
  },

  update: async function (req, res) {
    try {
      const { id } = req.allParams();
      const { title, description, status } = req.body;
      if (!id) {
        return res.badRequest({ err: 'Id is required', status: 'error' });
      }

      const task = await Task.update(
        { uuid: id },
        { title, description, status }
      ).fetch();
      if (!task) {
        return res.notFound({ err: 'Task not found', status: 'error' });
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
        status: 'error',
      });
    }
  },

  delete: async function (req, res) {
    try {
      const { id } = req.allParams();
      if (!id) {
        return res.badRequest({ err: 'Id is required', status: 'error' });
      }

      const task = await Task.destroy({ uuid: id });
      if (!task) {
        return res.notFound({ err: 'Task not found', status: 'error' });
      }

      return res.ok({
        message: 'Task deleted successfully',
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.serverError({
        err: 'Something went wrong',
        status: 'error',
      });
    }
  },
};
