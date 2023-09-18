import Router from 'koa-router';
import todoHandler from '../handlers/todoHandler.js';
import validateTodo from '../middleware/validate.js';

const router = new Router({
    prefix: '/api'
});

router.get('/todos', todoHandler.getTodos);
router.post('/todos', validateTodo, todoHandler.createTodo);
router.put('/todos/ids', todoHandler.updateTodoByIds);
router.put('/todo/:id', todoHandler.updateTodoById);
router.delete('/todo/:id', todoHandler.deleteTodoById);
router.delete('/todos/ids', todoHandler.deleteTodoByIds);

export default router

