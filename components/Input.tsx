import clsx from "clsx";
import React from "react";

type Color = "primary" | "default" | "secondary";
type Size = "sm" | "md" | "lg";
type InputType = "textarea" | "text" | "password";

type InputProps = {
  color?: Color;
  size?: Size;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  label?: string;
  prefix?: string | React.ReactElement;
  afterFix?: string | React.ReactElement;
  charLimit?: number;
  subtitle?: string;
  optional?: boolean;
  helperText?: string;
  value?: string;
  placeholder?: string;
  id?: string;
  name?: string;
};

const Input: React.FC<InputProps> = ({
  color = "default",
  size = "md",
  label,
  optional,
  subtitle,
  type = "text",
  prefix,
  afterFix,
  charLimit,
  helperText,
  value,
  onChange,
  ...inputProps
}) => {
  const inputClassName = "";
  return (
    <div className="w-full">
      {label && (
        <label>
          {label}
          {optional && <span>(Optional)</span>}
        </label>
      )}
      {subtitle && <p>{subtitle}</p>}
      {type === "textarea" ? (
        <textarea
          onChange={onChange as any}
          className={`${inputClassName}`}
          {...inputProps}
        />
      ) : (
        <div
          className={clsx(
            "w-full mb-4 text-gray-700 border border-primary-bg rounded-[5px] focus:outline-none",
            {
              "border-red-600": !!helperText,
              "border-blue-500": color === "primary",
              "border-gray-700": color === "default",
              "border-green-500": color === "secondary",
              "text-sm h-9": size === "sm",
              "text-sm h-11": size === "md",
              "text-lg h-14": size === "lg",
            }
          )}
        >
          {prefix && prefix}
          <input
            type={type}
            className="w-full px-4 py-2 h-full bg-transparent text-white outline-none border-none"
            {...inputProps}
          />
          {afterFix && afterFix}
        </div>
      )}
      {charLimit && (
        <div className={value && value?.length > charLimit ? "over" : ""}>
          {value?.length}/{charLimit}
        </div>
      )}
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default Input;
