import { SignInForm } from "@/app/(auth)/_components/sign-in-form";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div>
      <SignInForm />
      <Link
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className: "mt-4",
        })}
        href="/sign-up"
      >
        新規登録はこちら
      </Link>
    </div>
  );
};

export default SignInPage;
