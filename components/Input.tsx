import clsx from "clsx";
import React from "react";

type Color = "primary" | "default" | "secondary";
type Size = "sm" | "md" | "lg";
type InputType = "textarea" | "text" | "password" | "email";

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
  const classNames = clsx(
    "w-full text-gray-700 overflow-hidden border border-primary-bg focus:outline-none",
    {
      "border-red-600": !!helperText,
      "border-blue-500": color === "primary",
      "border-gray-700": color === "default",
      "border-green-500": color === "secondary",
      "text-sm h-9": size === "sm",
      "text-sm h-11": size === "md",
      "text-lg h-14": size === "lg",
    }
  );
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
          className={`${classNames}`}
          {...inputProps}
        />
      ) : (
        <div className={classNames}>
          {prefix && prefix}
          <input
            type={type}
            onChange={onChange}
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
      {helperText && <p className="text-xs text-red-500 mt-2">{helperText}</p>}
    </div>
  );
};

export default Input;
