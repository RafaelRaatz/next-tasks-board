import Head from "next/head";
import { Container } from "../../styles/dashboard";
import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { TextArea } from "@/components/textArea";
import { FaAngleRight } from "react-icons/fa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";

interface HomeProps {
  user: {
    email: string;
  };
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tasks: string;
  user: string;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [publicTask, setpublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const taskRef = collection(db, "tasks");
      const q = query(
        taskRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      );

      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            tasks: doc.data().tasks,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        setTasks(list);
      });
    }

    loadTasks();
  }, [user?.email]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setpublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tasks"), {
        tasks: input,
        created: new Date(),
        user: user?.email,
        public: publicTask,
      });

      setInput("");
      setpublicTask(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );

    alert("URL copied");
  }

  async function handleDeleteTaks(id: string) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }

  return (
    <Container>
      <Head>
        <title>My Dashboard</title>
      </Head>
      <div className="main">
        <div className="main-content">
          <div className="content-form">
            <h1 className="form-title">What is your task?</h1>

            <form action="" className="form" onSubmit={handleRegisterTask}>
              <TextArea
                placeholder="enter your task here"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className="checkbox-area">
                <input
                  type="checkbox"
                  className="input-checkbox"
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label htmlFor="">Leave Public Task?</label>
              </div>
              <button type="submit" className="form-button">
                Register
              </button>
            </form>
          </div>
        </div>

        <div className="task-container">
          <h1>My Tasks</h1>

          {tasks.map((item) => (
            <div key={item.id} className="task">
              {item.public && (
                <div className="infos-container">
                  <div className="tag-container">
                    <label className="tag">Public</label>
                    <button
                      className="share-button"
                      onClick={() => handleShare(item.id)}
                    >
                      <FiShare2 size={22} color="#3183ff" />
                    </button>
                  </div>
                  <Link href={`/task/${item.id}`}>
                    <button className="details">
                      Details <FaAngleRight size={16} />
                    </button>
                  </Link>
                </div>
              )}

              <div className="task-content">
                {item.public ? (
                  <Link href={`/task/${item.id}`}>
                    <p>{item.tasks}</p>
                  </Link>
                ) : (
                  <p>{item.tasks}</p>
                )}

                <button
                  className="trash-button"
                  onClick={() => handleDeleteTaks(item.id)}
                >
                  <FaTrash size={12} color="#fff" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};
