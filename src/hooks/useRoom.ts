import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >;
};

export function useRoom(roomId: string | undefined) {
  const { user } = useContext(AuthContext);
  const [listQuestions, setListQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (ref) => {
      const room = ref.val();
      const parsedQuestions = Object.entries(room.questions ?? {}).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      setTitle(room.title);
      setListQuestions(parsedQuestions);
    });

    return () => {
      unsubscribe();
    };
  }, [roomId, user?.id]);

  return { listQuestions, title };
}
