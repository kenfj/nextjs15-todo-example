import { signOutAction } from "@/actions/auth";

export default function SignOut() {
  return (
    <form action={signOutAction}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
