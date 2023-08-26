import RegistrationForm from "@/components/register-form";
import AuthFooter from "@/components/ui/auth-footer";

const page = () => {
  return (
    <div className="grid place-items-center h-screen p-10">
      <RegistrationForm />
      <AuthFooter />
    </div>
  );
};

export default page;
