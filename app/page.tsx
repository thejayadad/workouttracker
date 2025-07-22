
import { auth, signIn, signOut, } from "@/auth"

export default async function Home() {
  const session = await auth()
  const userEmail = session?.user?.email

  return (
    <main>
      {
        session ? (
          <>
                <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button type="submit">SignOut</button>
          </form>
          {userEmail}
          </>
        ) : (
          <>
        <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
          
          </>
        )
      }
    </main>
  );
}
