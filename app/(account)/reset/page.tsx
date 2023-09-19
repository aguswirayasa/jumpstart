/* eslint-disable react/no-unescaped-entities */
import ResetPasswordForm from "@/components/account/reset-password-form";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="grid place-items-center p-10 max-w-xl mx-auto">
      <div className="space-y-3">
        <div className="text-center  grid place-items-center max-w-md">
          <Link href={"/"}>
            <Image src={"/icon.png"} width={100} height={100} alt="Jumstart" />
          </Link>
          <h2 className="font-bold text-5xl">Reset Password</h2>
          <p className="font-semibold text-xl">
            Enter your email below, and we'll send you a secure link to reset it
          </p>
        </div>
        <div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default page;
