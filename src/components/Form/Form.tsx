import { useState } from "react";
import { Form as ReactForm } from "react-router-dom";
import { toast } from "react-toastify";
import { decryptData, encryptData } from "../../lib/crypto.js";
import { XSquare, Copy, Save } from "lucide-react";

type PropsType = {
  type?: "Encrypt" | "Decrypt";
};

const Form = ({ type = "Encrypt" }: PropsType) => {
  const [text, setText] = useState("");

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const val = {
      private_key: formData.get("private_key"),
      text: formData.get("text"),
    };

    if (val.private_key && val.text) {
      const trimmedPrivateKey = val.private_key.toString().trim();
      const trimmedText = val.text.toString().trim();

      if (!trimmedPrivateKey || !trimmedText) {
        toast.error("Please fill all the fields");
        console.log("err");
      } else {
        const convertedData =
          type === "Encrypt"
            ? encryptData(val.text.toString(), val.private_key.toString())
            : decryptData(val.text.toString(), val.private_key.toString());
        console.log(convertedData);
        if (type === "Decrypt" && !convertedData) {
          toast.error("Looks Like You Provide Wrong Key");
        }
        setText(convertedData);
      }
    }
  };
  const handlePrompt = () => {
    const userInput = window.prompt("Enter The Name:");
    if (userInput === null || !userInput.trim()) {
      toast.error("Please Write Name to Save");
    } else {
      addOrUpdateLocalStorage({ name: userInput, key: text });
    }
  };

  const addOrUpdateLocalStorage = (newData: Record<string, unknown>) => {
    try {
      // Check if data with the given key already exists in localStorage
      const existingData = localStorage.getItem("encryptedData");

      // If data already exists, parse it from JSON
      let parsedData = existingData ? JSON.parse(existingData) : [];

      if (Array.isArray(parsedData)) {
        // If it's an array, push the new item into it
        parsedData.push(newData);
      } else {
        // If it's not an array (or doesn't exist), create a new array with the new item
        parsedData = [newData];
      }

      // Convert the merged data back to JSON
      const jsonData = JSON.stringify(parsedData);

      // Store the merged JSON data in localStorage
      localStorage.setItem("encryptedData", jsonData);

      toast.success("Data added successfully");
    } catch (error) {
      console.error("Error adding/updating localStorage:", error);
      toast.error("Something went wrong while storing the data");
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] bg-gray-100 py-6 flex flex-col justify-center relative items-center'>
      <div
        className={`absolute top-4 min-h-[100px] p-2 px-3 w-[96%] mx-auto border   bg-gradient-to-r from-blue-300 to-blue-600 rounded-md z-50 break-words whitespace-pre-line overflow-hidden ${
          text ? "opacity-100 scale-100" : `opacity-0 scale-0`
        } duration-300 delay-75

        `}
      >
        <div className='flex items-center justify-between pr-2'>
          <p className='font-semibold '>Your Encrypted Data:</p>
          <Copy
            className='ml-auto cursor-pointer mr-4'
            onClick={() => {
              navigator.clipboard.writeText(text);
              toast.success("Copied");
            }}
          />
          <XSquare className='cursor-pointer' onClick={() => setText("")} />
        </div>
        {text}
      </div>
      <div className='relative py-3 max-w-xl mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform skew-y-0 -rotate-6  rounded-3xl'></div>
        <div className='relative px-7 py-14 bg-white shadow-lg rounded-3xl sm:p-20'>
          <div className='max-w-md mx-auto min-w-[300px]'>
            <div>
              <h1 className='text-2xl font-semibold text-center'>
                {type} your Data
              </h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <ReactForm
                onSubmit={handleSubmission}
                className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'
              >
                <div className='relative'>
                  <input
                    id='text'
                    name='text'
                    type='text'
                    className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Enter Text...'
                    autoComplete='off'
                    required
                  />
                  <label
                    htmlFor='text'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                  >
                    Enter Text
                  </label>
                </div>
                <div className='relative'>
                  <input
                    id='private_key'
                    name='private_key'
                    type='text'
                    className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Password'
                    autoComplete='off'
                    required
                  />
                  <label
                    htmlFor='private_key'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                  >
                    Enter Private Key
                  </label>
                </div>
                <div className='relative flex'>
                  <button
                    className='bg-blue-500 text-white rounded-md px-2 py-1'
                    type='submit'
                  >
                    {type}
                  </button>
                  {type === "Encrypt" && (
                    <div
                      className='flex bg-blue-500 text-white rounded-md px-2 py-1 ml-2 gap-1 items-center cursor-pointer'
                      onClick={() => {
                        if (!text) return toast.error("Encrypt the data first");

                        handlePrompt();
                      }}
                    >
                      <Save size={18} />
                      Save
                    </div>
                  )}
                </div>
              </ReactForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
