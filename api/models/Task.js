const uuid = async () => {
  return await sails.helpers.generateUuid();
};

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
    uuid: {
      type: 'string',
      unique: true
    },
  },

  beforeCreate: async (values, next) => {
    console.log(values);
    values.uuid = await uuid();
    next();
  }
};
