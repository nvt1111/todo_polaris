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

export function updateById(id) {
    //todo: 2 hàm controller riêng nhưng ta dùng 1 hàm repository chung cho 2 hàm controller đước không ? 
    //todo: nhiều if quá , cố gắng tìm cách khác viết đỡ if đi đc không ? 
    const todoList = todos.map(todo => {
        if (todo.id === parseInt(id)) {
            if (todo.status === 'Pending') {
                return { ...todo, status: 'Done' }
            }
            return { ...todo, status: 'Pending' }
        }
        return todo;
    })
    writeFileSync(todoList);

    return todoList
}

export function updateByIds(idArray) {
    const todoList = todos.map(todo => {
        if (idArray?.includes(todo.id)) {
            if (todo.status === 'Pending') {
                return { ...todo, status: 'Done' }
            }
            return { ...todo, status: 'Pending' }
        }
        return todo;
    })
    writeFileSync(todoList);

    return todoList;
}

export function deleteById(id) {
    //todo: tương tự như edit liệu có dùng đc 1 hàm hay không ? 
    const todoList = todos.filter(todo => todo.id !== parseInt(id));
    writeFileSync(todoList);

    return todoList;
}

export function deleteByIds(idArray) {
    const newTodos = todos.filter(todo => !idArray.includes(todo.id));
    writeFileSync(newTodos);
    return newTodos;
}


