import illustration from "../assets/images/illustration.svg";
import letmeask from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import { ref, get, child } from "firebase/database";

export function Home() {
  const navigate = useNavigate();
  const { user, authGoogle } = useContext(AuthContext);
  const [roomCode, setRoomCode] = useState("");

  const createRoom = async () => {
    if (!user) {
      await authGoogle();
    }

    navigate("/new-room");
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await ref(db, `rooms/${roomCode}`);
    const dataRef = await get(roomRef);
    const endedAtRef = child(roomRef, "endedAt");

    if (!dataRef.exists()) {
      alert("Room does not exists");
      return;
    }

    if (endedAtRef) {
      alert("Room already closed");
      return;
    }

    navigate(`/new-room/${roomCode}`);
  };

  return (
    <div className="flex w-[100%] h-[100vh]">
      <aside className="bg-purple-600 w-[45%] h-auto flex flex-col items-start  p-12">
        <img
          className="max-w-[313px]"
          src={illustration}
          alt="ilustração de perguntas e respostas"
        />
        <h2 className="font-Poppins font-bold text-white text-[36px]">
          Toda pergunta tem uma resposta.
        </h2>
        <footer className="font-light text-white ">
          Aprenda e compartilhe conhecimento com outras pessoas
        </footer>
      </aside>
      <div className=" w-[55%] h-auto flex flex-col items-center justify-center gap-8">
        <img
          src={letmeask}
          alt="logo letmeask"
          className="max-w-[155px] mb-[24px]"
        />
        <button
          onClick={createRoom}
          className="bg-[#EA4335] flex w-[320px] h-[50px] text-white rounded-md font-medium items-center justify-center gap-2 outline-none"
        >
          <img src={googleIcon} />
          Crie sua sala com o google
        </button>
        <p className="flex items-center gap-3">
          <div className="w-[76px] h-0.5 bg-gray-400" />
          <span className="text-sm text-gray-500">Ou entre em uma sala</span>
          <div className="w-[76px] h-0.5 bg-gray-400" />
        </p>
        <form className="flex flex-col " onSubmit={handleJoinRoom}>
          <input
            type="text"
            className="w-[320px] h-[50px] ring-2 ring-gray-400 rounded-md p-5 outline-none mb-[16px]"
            placeholder="Digite o código da sala "
            onChange={(event) => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button type="submit">Entrar na sala</Button>
        </form>
      </div>
    </div>
  );
}
