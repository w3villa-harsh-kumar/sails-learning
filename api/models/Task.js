module.exports = {
  attributes: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    status: {
      type: 'string',
      isIn: ['pending', 'ongoing', 'completed'],
      defaultsTo: 'pending',
    },
  },
};
