import { useSession, signIn, signOut } from "next-auth/react"
import {Button} from "@nextui-org/react";

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <Button color="danger" variant="faded" onClick={() => signOut()}>
        SignOut
      </Button>  

      </>
    )
  }
  return (
    <>
      {/* <button onClick={() => signIn()}>Sign in</button> */}
      <Button color="success" onClick={() => signIn("google")}>
        SignIn
      </Button> 
    </>
  )
}