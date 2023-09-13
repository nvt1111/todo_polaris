import { useEffect, useState } from "react";
import { baseUrl } from '../helpers/constants/baseUrl';

const useFetchData = () => {
    const [todos, setTodos] = useState([])
    async function loadTodoes() {
        const path = '/todos';
        const url = `${baseUrl}${path}`;
        const resp = await fetch(url);
        const todolist = await resp.json(); //  Obj
        setTodos(todolist["data"]);
    }
    useEffect(() => {
        console.log('Component mounted');
        loadTodoes();
    }, [])

    return { todos, setTodos }
}

export default useFetchData;
