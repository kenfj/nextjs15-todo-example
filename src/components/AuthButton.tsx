import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

const AuthButton = async () => {
  const session = await auth();

  return (
    <div>
      {session ? (
        <SignOut />
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default AuthButton;
