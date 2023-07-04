/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /api/v1/tasks': 'TaskController.create',
  'GET /api/v1/tasks': 'TaskController.get',
  'GET /api/v1/tasks/:id': 'TaskController.getOne',
  'PATCH /api/v1/tasks/:id': 'TaskController.update',
  'DELETE /api/v1/tasks/:id': 'TaskController.delete',
};
