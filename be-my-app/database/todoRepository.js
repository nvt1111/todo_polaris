import { writeFileSync, readFileSync } from '../helpers/writeAndReadFileSync.js';

const todos = readFileSync();

export function getAll() {
    let result = [...todos];
    return result;
}

export function add(data) {
    const todo = { id: parseInt(Date.now()), ...data };
    const dataObject = [{ ...todo }, ...todos]
    //data: Object
    writeFileSync(dataObject);

    return dataObject
}

export function updateTodo(ids) {
    const newTodos = todos.map(todo => {
        if (ids?.includes(todo.id)) {
            return { ...todo, completed: !todo.completed }
        }
        return todo;
    })
    writeFileSync(newTodos);

    return newTodos;
}

export function deleteTodo(ids) {
    const newTodos = todos.filter(todo => !ids.includes(todo.id.toString()));
    writeFileSync(newTodos);

    return newTodos;
}


