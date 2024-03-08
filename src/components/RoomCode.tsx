import copyImg from "../assets/images/copy.svg";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code);
  };

  return (
    <button
      onClick={copyRoomCodeToClipboard}
      className="h-[40px] rounded-md overflow-hidden bg-[#fff] ring-2 ring-[#835afd] cursor-pointer flex"
    >
      <div className="bg-[#835afd] flex justify-center items-center h-full w-12">
        <img src={copyImg} alt="copyImage" className="" />
      </div>
      <span className="block self-center flex-1 w-[240px] text-sm font-medium">
        Sala #{props.code}
      </span>
    </button>
  );
}
