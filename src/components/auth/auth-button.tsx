import SignIn from "@/components/auth/sign-in";
import SignOut from "@/components/auth/sign-out";
import { auth } from "@/lib/auth/auth";

const AuthButton = async () => {
  const session = await auth();

  return (
    session
      ? <SignOut />
      : <SignIn />
  );
};

export default AuthButton;
