import { Link } from "react-router-dom";
import illustration from "../assets/images/illustration.svg";
import letmeask from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../App";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export function NewRoom() {
  const { user } = useContext(AuthContext);
  const [newRoom, setNewRoom] = useState("");
  const navigate = useNavigate();

  const createRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = ref(db, "rooms");
    const firebaseRoom = await push(roomRef);
    const roomData = {
      title: newRoom,
      authorId: user?.id,
    };
    set(firebaseRoom, roomData);

    navigate(`/new-room/${firebaseRoom.key}`);
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
        <h2 className="font-Poppins font-bold text-[24px]">
          Crie uma nova sala
        </h2>
        <form className="flex flex-col " onSubmit={createRoom}>
          <input
            type="text"
            className="w-[320px] h-[50px] ring-2 ring-gray-400 rounded-md p-5 outline-none mb-[16px]"
            placeholder="Nome da sala "
            onChange={(event) => setNewRoom(event.target.value)}
            value={newRoom}
          />
          <Button type="submit">Criar Sala</Button>
        </form>
        <footer className="text-sm flex gap-1 text-gray-500">
          Quer entrar em uma sala já existente?
          <Link to="/" className="text-purple-400 underline">
            Clique aqui
          </Link>
        </footer>
      </div>
    </div>
  );
}
