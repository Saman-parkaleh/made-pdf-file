import axios from "axios";
import jsPDF from "jspdf";
import { useState } from "react";
import "./App.css";
import "jspdf-autotable";

function App() {
  const [data, setData] = useState([]);

  const getdata = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      const data = response.data;
      console.log(data);
      setData(data);
    });
  };
  const download = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table" });
    pdf.save("Msi.pdf");
  };

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-black">
        دانلود جدول به صورت pdf
      </h1>
      <button
        className=" bg-sky-500 p-2 text-xl m-10 rounded-xl shadow-xl font-extrabold border-0 border  "
        onClick={getdata}
      >
        نمایش جدول
      </button>
      {data.length > 0 && (
        <div className="">
          <button
            onClick={download}
            className="bg-red-400 p-2 text-xl font-extrabold m-10 rounded-xl shadow-xl  "
          >
            دانلود جدول
          </button>

          <h1 className="text-center text-red-300 text-xl font-bold mb-3">
            جدول اطلاعات
          </h1>
          <table className="mx-20   bg-lime-100 w-[80vw] p-3" id="table">
            <thead>
              <tr className="bg-red-100 ">
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{String(item.completed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
