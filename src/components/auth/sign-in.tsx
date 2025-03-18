import { signInAction } from "@/actions/auth";

export default function SignIn() {
  return (
    <form action={signInAction}>
      <button type="submit">Sign In</button>
    </form>
  );
}
