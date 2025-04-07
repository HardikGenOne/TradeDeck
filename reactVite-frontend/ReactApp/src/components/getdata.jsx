import { useEffect } from "react";

export async function FetchData() {
    const res = await fetch("http://127.0.0.1:8000/data");
    const data = await res.json();
    return data;
}

function FetchDataComponent() {
    useEffect(() => {
      FetchData().then(data => console.log(data));
    }, []);
    return <div>Loading...</div>;
}

export default FetchDataComponent;