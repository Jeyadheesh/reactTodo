import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScanner() {
  const [data, setData] = useState("No result");

  return (
    <div className="flex flex-col gap-5">
      <QrReader
        className="h-[30rem] w-[30rem]"
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
          }

          if (error) {
            console.log(error.message);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </div>
  );
}
