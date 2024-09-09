import LoginButton from "@/components/login-btn";
import Tasks from "@/components/tasks";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
    <div className="h-screen ">
      <div className="border flex flex-row-reverse m-2">
        <div className="">
          <LoginButton/>
        </div>
        
      </div>
      <div className="h-full flex justify-center items-center text-2xl">
        {session ? (<><Tasks/></>):(<>Please sign in</>)}
      </div>
    </div>
    </>
  );
}
