import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [text, setText] = useState("");
  const [item, setItem] = useState([]);
  const [cb, setCb] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("note"))
      { setItem(JSON.parse(localStorage.getItem("note"))) }
}, []);
  useEffect(() => {
    console.log(item);
    if (item.length > 0) {
      localStorage.setItem("note", JSON.stringify(item))
    }
  }, [item]);

  const notify1 = () => {
    toast.success('Item Added To The List', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const notify2 = () => {
    toast.success('Item Deleted', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const notify3 = () => {
    toast.error('Please Provide Value', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <main style={{ paddingTop: "15vh" }}>
      <div style={{ width: "30%", margin: "0 auto", border: "#eaecee 1px solid" }}>
        <h1 style={{ textAlign: "center" }}>Grocery Bud</h1>
        <form action="" style={{ textAlign: "center" }}>
          <input style={{ width: "80%" }} value={text} onChange={(e) => { setText(e.target.value) }} type="text" />
          <button style={{ background: "#06b6d4", color: "white", border: "none", padding: "3px" }} onClick={(e) => { e.preventDefault(); if (text.length > 0) { setItem([...item, { p: text, flag: false }]); notify1(); setText("") } else { notify3() } }} >Add Item</button>
        </form>
        <div style={{ marginTop: "5vh" }}>
          {item.map((ele, idx) => {
            return (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5vh" }} key={idx}>
                <div style={{ display: "flex" }}>
                  <input type="checkbox" value={ele.flag} style={{ marginRight: "1vw" }} onChange={() => {
                    let arr = [...item];
                    arr[idx].flag = !arr[idx].flag;
                    setItem(arr);
                  }} />

                  <p style={ele.flag ? { textDecoration: "line-through" } : {}}>{ele.p}</p>
                </div>
                <button style={{ alignSelf: "flex-start", border: "none", padding: "3px", background: "black", color: "white", borderRadius: "6px" }} onClick={() => {
                  let arr = [...item];
                  arr.splice(idx, 1)
                  setItem(arr);
                  notify2()
                }}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>

      <ToastContainer />

    </main>
  )
}