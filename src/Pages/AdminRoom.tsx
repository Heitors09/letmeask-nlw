import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useParams } from "react-router-dom";
import deleteImg from "../assets/images/delete.svg";
//import { useState, useContext, FormEvent, useEffect } from "react";
//import { AuthContext } from "../App";
import { db } from "../firebase";
import { ref, remove, update } from "firebase/database";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { useNavigate } from "react-router-dom";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  //const { user } = useContext(AuthContext);
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, listQuestions } = useRoom(roomId);
  console.log(listQuestions);
  const navigate = useNavigate();

  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm("Você tem certeza que deseja excluir essa pergunta?")) {
      const questionRef = ref(db, `rooms/${roomId}/questions/${questionId}`);
      await remove(questionRef);
    }
  };

  const handleEndRoom = async () => {
    const roomRef = ref(db, `rooms/${roomId}`);
    const endedAt = new Date().toISOString();
    await update(roomRef, { endedAt });

    navigate("/");
  };

  const handleCheckQuestion = async (questionId: string) => {
    const questionRef = ref(db, `rooms/${roomId}/questions/${questionId}`);
    const updates = {
      isAnswered: true,
    };
    await update(questionRef, updates);
  };

  const handleHighlightQuestion = async (questionId: string) => {
    const questionRef = ref(db, `rooms/${roomId}/questions/${questionId}`);
    const updates = {
      isHighlighted: true,
    };
    await update(questionRef, updates);
  };

  return (
    <div>
      <header className=" h-[117px] w-[100%] flex items-center  justify-around  border-b-2 border-[#E2E2E2]">
        <img src={logo} alt="LetmeaskLogo" className="w-[10%]" />
        <div className="flex items-center gap-3">
          <RoomCode code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>
            Encerrar Sala
          </Button>
        </div>
      </header>
      <main className="bg-[#FFFFFF] flex flex-col gap-8 mx-auto w-[800px] mt-[64px]">
        <div className="flex items-center gap-4 w-[320px]">
          <h2 className="font-Poppins font-bold text-[24px] text-[#29292E]">
            Sala {title}
          </h2>
          {listQuestions.length > 0 && (
            <span className="h-[32px] bg-[#e559f9] w-[107px] text-sm rounded-full text-white flex items-center justify-center">
              {listQuestions.length} perguntas
            </span>
          )}
        </div>
        <div className="mt-8">
          {listQuestions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img src={checkImg} alt="check button" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="answer button" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="delete button" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
