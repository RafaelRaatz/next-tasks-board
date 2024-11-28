import Head from "next/head";
import { Container } from "../../styles/task";
import { GetServerSideProps } from "next";
import { TextArea } from "@/components/textArea";
import { db } from "../../services/firebaseConnection";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface TaskProps {
  item: {
    task: string;
    public: boolean;
    created: string;
    user: string;
    taskId: string;
  };
  allComments: CommentProps[];
}

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

export default function Task({ item, allComments }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    if (!session?.user?.email || !session.user.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      });

      const data = {
        id: docRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      };

      setComments((oldItems) => [...oldItems, data]);

      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);

      const deleteComment = comments.filter((item) => item.id !== id);

      setComments(deleteComment);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Head>
        <title>Task Details</title>
      </Head>

      <div className="main">
        <h1>Task</h1>
        <div className="task">
          <p>{item.task}</p>
        </div>
      </div>

      <div className="comments-container">
        <h2>Leave a comment</h2>

        <form onSubmit={handleComment} className="form-comment">
          <TextArea
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
            placeholder="type your comment"
          />
          <button disabled={!session?.user} className="comment-button">
            send comment
          </button>
        </form>
      </div>

      <div className="comments-container">
        <h2>All Comments</h2>
        {comments.length === 0 && (
          <span>Nenhum Comentario foi encontrado...</span>
        )}

        {comments.map((item) => (
          <div key={item.id} className="comment">
            <div className="head-comment">
              <label className="comment-label">{item.name}</label>
              {item.user === session?.user?.email && (
                <button
                  className="button-trash"
                  onClick={() => handleDeleteComment(item.id)}
                >
                  <FaTrash size={12} />
                </button>
              )}
            </div>
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tasks", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));

  const snapshotComments = await getDocs(q);

  let allComments: CommentProps[] = [];
  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    });
  });

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    task: snapshot.data()?.tasks,
    public: snapshot.data()?.public,
    createdd: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
