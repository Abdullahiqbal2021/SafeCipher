import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  return (
    <div className='flex flex-col'>
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
