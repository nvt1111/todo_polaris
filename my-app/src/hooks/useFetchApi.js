import { useEffect, useState } from "react";
import { baseUrl } from '../helpers/constants/baseUrl';

const useFetchData = (path = "") => {
    const [todos, setTodos] = useState([])
    async function loadTodoes() {
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
