import { SignInForm } from "@/app/(auth)/_components/sign-in-form";
import { SocialButtons } from "@/app/(auth)/_components/social-buttons";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div>
      <SignInForm />
      <Separator className="my-4" />
      <SocialButtons />
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
