import Link from "next/link";
import { Container } from "./styles";
import { useSession, signIn, signOut} from "next-auth/react";


export function Header() {
  const { data: session, status } = useSession();


  return (
    <Container>
      <div className="header-content">
        <div className="header-right">
          <Link href={"/"}>
            <h1 className="logo">
              Tasks <span>+</span>
            </h1>
          </Link>

          {session?.user && (
            <Link href={"/dashboard"}>
              <button className="header-button">
                {" "}
                {session?.user?.name} Profile{" "}
              </button>
            </Link>
          )}
        </div>

        {status === "loading" ? (
          <></>
        ) : session ? (
          <button className="header-button" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <button className="header-button" onClick={() => signIn("google")}>
            Login
          </button>
        )}
      </div>
    </Container>
  );
}

