const uuid = require('uuid/v4');

module.exports = {
  friendlyName: 'Generate uuid',

  description: 'Generate uuid for task',

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    return uuid();
  },
};
