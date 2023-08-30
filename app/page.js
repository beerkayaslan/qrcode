"use client";
import { QRCode, Barcode } from "@progress/kendo-react-barcodes";
import { useRef, useState } from "react";
import html2canvas from 'html2canvas';

export default function Home() {

  const [text, setText] = useState("test");
  const [select, setSelect] = useState("qrcode");

  const qrRef = useRef();

  const download = (canvas) => {
    var link = document.createElement('a');
    link.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    link.download = 'image.png';
    link.click();
  }

  const downloadHandler = () => {
    html2canvas(qrRef.current).then(canvas => {
      download(canvas)
    });
  }



  return (
    <div className="p-2 flex flex-col items-center">
      <div className="border p-2 max-w-max rounded">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" x="0" y="0" viewBox="0 0 24 24"  ><g><g fill="#000"  ><path d="M18.154 19.457c.708 0 1.282-.576 1.282-1.286v-2.057a.77.77 0 1 1 1.538 0v2.057A2.825 2.825 0 0 1 18.154 21h-2.051a.77.77 0 0 1 0-1.543zM18.154 4.543c.708 0 1.282.575 1.282 1.286v2.057a.77.77 0 1 0 1.538 0V5.829A2.825 2.825 0 0 0 18.154 3h-2.051a.77.77 0 0 0 0 1.543zM5.846 19.457a1.284 1.284 0 0 1-1.282-1.286v-2.057a.77.77 0 1 0-1.538 0v2.057A2.825 2.825 0 0 0 5.846 21h2.051a.77.77 0 0 0 0-1.543zM5.846 4.543c-.708 0-1.282.575-1.282 1.286v2.057a.77.77 0 1 1-1.538 0V5.829A2.825 2.825 0 0 1 5.846 3h2.051a.77.77 0 0 1 0 1.543zM22 12a.77.77 0 0 1-.77.771H2.77a.77.77 0 0 1 0-1.542h18.46A.77.77 0 0 1 22 12z" fill="#000000" data-original="#000000" ></path></g></g></svg>
      </div>
      <h1 className="text-2xl font-semibold my-2 text-gray-800">Create QR Code or Barcode</h1>
      <p className="text-gray-500">Select your code pattern.</p>

      <div className="flex items-center border h-10  rounded overflow-hidden bg-white mt-3 cursor-pointer select-none">
        <div className={`select-btn ${select === "qrcode" ? "active" : ""}`} onClick={() => setSelect("qrcode")}>QR Code</div>
        <div className={`select-btn ${select === "barcode" ? "active" : ""}`} onClick={() => setSelect("barcode")}>Barcode</div>
      </div>

      <div className="border p-2 rounded mt-4 bg-white">
        <div className="p-1" ref={qrRef}>
          {select === "qrcode"
            ?
            <QRCode style={{ height: 250, width: 250 }} value={text} color="black" />
            :
            <Barcode style={{ width: 300 }} type="Code128" value={text} />
          }
        </div>
      </div>
      
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        type="text"
        className="block rounded-md border-0 p-2 h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-3 outline-none w-full "
      />
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10 w-full"
        onClick={downloadHandler}
      >
        Download
      </button>
    </div>
  )
}
