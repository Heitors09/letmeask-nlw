import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useParams } from "react-router-dom";
import { useState, useContext, FormEvent, useEffect } from "react";
import { AuthContext } from "../App";
import { db } from "../firebase";
import { ref, push, set, child, remove } from "firebase/database";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useContext(AuthContext);
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [question, setQuestion] = useState("");
  const { title, listQuestions } = useRoom(roomId);

  const handleNewQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (question.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }
    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const questionRef = await ref(db, `rooms/${roomId}/questions`);

    const questionPush = await push(questionRef);

    set(questionPush, newQuestion);

    setQuestion("");
  };

  const handleLikeQuestion = async (
    questionId: string,
    likeId: string | undefined
  ) => {
    if (likeId) {
      const likesRef = ref(
        db,
        `rooms/${roomId}/questions/${questionId}/likes/${likeId}`
      );

      await remove(likesRef);
    } else {
      const newLike = await ref(
        db,
        `rooms/${roomId}/questions/${questionId}/likes`
      );
      const likeSubmit = await push(newLike);
      const dataLike = {
        authorId: user?.id,
      };
      set(likeSubmit, dataLike);
    }
  };

  return (
    <div>
      <header className=" h-[117px] w-[100%] flex items-center  justify-around  border-b-2 border-[#E2E2E2]">
        <img src={logo} alt="LetmeaskLogo" className="w-[10%]" />
        <RoomCode code={roomId} />
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
        <form onSubmit={handleNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            className="min-h-[133px] w-[800px] resize-none p-5 ring-1 rounded-md outline-none"
            onChange={(event) => setQuestion(event.target.value)}
            value={question}
          />
          <div className=" flex w-[800px] justify-between mt-4">
            {user ? (
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-[#29292e] font-medium text-sm">
                  {user.name}
                </span>
              </div>
            ) : (
              <span className="flex gap-1 items-center text-[#737380]">
                Para enviar uma pergunta,
                <button className="text-[#835afd] underline cursor-pointer">
                  faça seu login
                </button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
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
                  <button
                    className="flex gap-2 items-end text-[#737380] hover:brightness-50 duration-100"
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
