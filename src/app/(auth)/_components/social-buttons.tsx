"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";

export const SocialButtons = () => {
  const handleClick = (provider: "google" | "cognito") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex item-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
        <span className="ml-2">Google</span>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("cognito")}
      >
        <FcGoogle className="w-5 h-5" />
        <span className="ml-2">Cognito</span>
      </Button>
    </div>
  );
};
