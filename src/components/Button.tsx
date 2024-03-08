import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isOutlined?: boolean;
}

export function Button({
  isOutlined = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${
        isOutlined
          ? "bg-white ring-1 ring-[#835afd] p-2  rounded-md text-[#835afd] font-medium text-sm h-[45px]"
          : "w-[320px] h-[50px] bg-purple-600 rounded-md text-white font-medium text-[16px]"
      }`}
    >
      {children}
    </button>
  );
}
