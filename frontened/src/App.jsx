import "./App.css";
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    async function fetchData(){

      const resolve = await fetch("http://127.0.0.1:5000/api/products");
      const data = await resolve.json();
      console.log(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>adsd</h1>
    </>
  );
}


