import Head from "next/head";
import { Container } from "../styles/home";
import Image from "next/image";
import bannerImg from "../../public/assets/banner.png";
import { getSession } from "next-auth/react";



export default function Home() {
  return (
    <>
      <Head>
        <title>Tasks Board</title>
      </Head>
      <Container>
        <div className="main-content">
          <Image className="bannerImg" src={bannerImg} alt={""} priority />
          <h1 className="title">
            System made for you to organize <br /> your studies and tasks
          </h1>
          <div className="card-section">
            <div className="card">
              <span>+ hundreds of posts</span>
            </div>
            <div className="card">
              <span>+ hundreds of comments</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

