import LoginForm from "@/components/login-form";
import AuthFooter from "@/components/ui/auth-footer";

const page = () => {
  return (
    <div className="grid place-items-center h-screen relative p-10">
      <LoginForm />
      <AuthFooter />
    </div>
  );
};

export default page;
