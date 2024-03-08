import { ReactNode } from "react";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div
      className={`"bg-[#fefefe] rounded-md shadow-md p-6 mb-2" 
      ${isAnswered ? "bg-[#DBDCDD]" : ""} 
      ${
        isHighlighted && !isAnswered
          ? "bg-[#f4f0ff] ring-2 ring-[#835afd] duration-200"
          : ""
      }`}
    >
      <p className="text-[#29292e]">{content}</p>
      <footer className=" flex justify-between items-center mt-6">
        <div className="flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2 text-[#737380]  text-sm">{author.name}</span>
        </div>
        <div className="rounded-full bg-transparent cursor-pointer flex gap-4">
          {children}
        </div>
      </footer>
    </div>
  );
}
