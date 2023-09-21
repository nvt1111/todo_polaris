import { useEffect, useState } from "react";
import { baseUrl } from '../constants/baseUrl';

const useFetchData = (path = "") => {
    const [data, setData] = useState([])
    async function loadDatas() {
        const url = `${baseUrl}${path}`;
        const resp = await fetch(url);
        const datalist = await resp.json(); //  Obj
        setData(datalist["data"]);
    }
    useEffect(() => {
        console.log('Component mounted');
        loadDatas();
    }, [])

    return { data, setData }
}

export default useFetchData;
