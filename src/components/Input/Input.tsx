import React from 'react';

type PropsType = {
  type?: 'text' | 'password';
  name: string;
  label: string;
};

const Input = ({ type = 'text', name, label }: PropsType) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        className={
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6ab7d9] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 bg-[#2a2b30]'
        }
        placeholder={label + ' . . .'}
      />
    </>
  );
};

export default Input;
