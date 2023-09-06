import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

type DataType = {
  name: string;
  key: string;
}[];

const ViewData = () => {
  const [data, setData] = useState<DataType>([]);

  useEffect(() => {
    const jsonData = localStorage.getItem("encryptedData");

    if (jsonData !== null) {
      const parsedData = JSON.parse(jsonData);
      setData(parsedData);
    }
  }, []);

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataToExport = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(
      dataToExport,
      new Date().toLocaleDateString() + fileExtension
    );
  };

  return (
    <div className='flex flex-col '>
      <div className='flex justify-end pr-6 py-1 gap-2'>
        <button
          className='bg-blue-500 text-white rounded-md px-4 py-1 my-1 ml-auto'
          onClick={() => {
            exportToExcel();
            toast.success("Excel exported");
          }}
        >
          Export
        </button>
        <button
          className='border-red-500 border hover:bg-red-500 hover:text-white duration-200 rounded-md px-4 py-1 my-1'
          onClick={() => {
            localStorage.removeItem("encryptedData");
            setData([]);
            toast.success("Data deleted");
          }}
        >
          Delete
        </button>
      </div>
      <div className='overflow-x-auto'>
        <div className='p-1.5 w-full inline-block align-middle'>
          <div className='overflow-hidden border rounded-lg'>
            <table className='min-w-full divide-y divide-gray-500'>
              <thead className='bg-gray-100 font-semibold'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-sm font-bold text-left text-gray-700 uppercase '
                  >
                    SR no.
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-sm font-bold text-left text-gray-700 uppercase '
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-sm font-bold text-left text-gray-700 uppercase '
                  >
                    Key
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3 text-sm font-bold text-left text-gray-700 uppercase '
                  >
                    Copy
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-300'>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                      {i + 1}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {item.name}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {item.key}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      <Copy
                        className='cursor-pointer hover:text-blue-500'
                        onClick={() => {
                          navigator.clipboard.writeText(item.key);
                          toast.success("Copied");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
