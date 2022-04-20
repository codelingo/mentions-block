import React, { forwardRef, Ref } from "react";

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  dark?: true;
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { className, type, placeholder, defaultValue, onChange, dark, ...rest } = props;
  return (
    <input
       {...rest}
       ref={ref}
       className={`text-sm text-white shadow-inner no-blur rounded-xl active:border-0 focus:outline-none h-7 w-full ${
         dark ? "bg-gray-700 bg-opacity-90" : "bg-gray-200 text-black"
       } pl-2 ${className}`}
       type={type}
       placeholder={placeholder}
       defaultValue={defaultValue}
       onChange={onChange}
    />
  );
});

export default Input;