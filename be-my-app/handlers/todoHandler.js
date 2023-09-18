import {
    getAll, add,
    updateTodo, deleteTodo
} from '../database/todoRepository.js';

const getTodos = (ctx) => {
    try {
        const data = getAll();

        ctx.body = {
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const createTodo = async (ctx) => {
    try {
        const data = ctx.request.body
        const newTodos = add(data);

        ctx.status = 201;
        ctx.body = {
            success: true,
            message: `Todo with ID ${data.id} has been created`,
            data: newTodos
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}


const updateTodoById = (ctx) => {
    try {
        const data = updateTodo([parseInt(ctx.params.id)]);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.params.id} has been UPDATED`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const updateTodoByIds = (ctx) => {
    try {
        const data = updateTodo(ctx.request.body);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.request.body} has been UPDATE`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const deleteTodoById = (ctx) => {
    try {
        const data = deleteTodo([ctx.params.id]);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.params.id} has been deleted`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const deleteTodoByIds = async (ctx) => {
    try {
        const data = deleteTodo(ctx.request.body.toString());

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.request.body.toString()} has been DELETE`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

export default {
    updateTodoById,
    createTodo,
    getTodos,
    deleteTodoById,
    updateTodoByIds,
    deleteTodoByIds
}

