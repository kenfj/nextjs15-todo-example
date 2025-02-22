import { signOut } from "@/lib/auth/auth"
import { PUBLIC_HOME } from "@/lib/routes";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: PUBLIC_HOME })
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}
