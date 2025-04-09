import { useState, useEffect } from 'react';
 function PdfViewer() {
  const [pdfFiles, setPdfFiles] = useState([]);
  useEffect(() => {
    fetch('https://library-kjji.onrender.com/api/lib/pdf')
      .then(response => response.json())
      .then(data => setPdfFiles(data))
      .catch(error => console.error('Error fetching PDFs:', error));
  }, []);

  return (
    <div className="w-full ">
      <h1 className="text-2xl text-center pt-2 font-bold">2020 Оны төгсөгчдийн дифлом PDF</h1>
      <ul className="grid grid-cols-1 lg:pl-20 sm:pl-30 md:pl-0 md:grid-cols-2 mt-10 gap-4 lg:grid-cols-2">
        {pdfFiles.map((fileName, index) => (
          <li key={index} className=" w-95 sm:w-110  md:w-92 lg:w-107 shadow-xl pt-6 p-4 rounded-lg">
            <h2 className="font-semibold text-lg">{fileName}</h2>
            <div className="flex flex-col mt-2">
              <iframe
                src={`https://library-kjji.onrender.com/${fileName}`}
                className="w-90 sm:w-100  md:w-82 lg:w-97  h-[400px] border rounded"
                title={`PDF Preview - ${fileName}`}
              />
              <a
                href={`https://library-kjji.onrender.com/${fileName}`}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                download
              >
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PdfViewer
