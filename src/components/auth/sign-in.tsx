import { signIn } from "@/lib/auth/auth"
import { LOGIN_HOME } from "@/lib/routes";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(undefined, { redirectTo: LOGIN_HOME })
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  )
}
