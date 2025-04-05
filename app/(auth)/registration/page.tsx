import { RegistrationForm } from "@/components/auth/RegistrationForm";

export default function Login() {
  return (
    <div className="min-h-svh flex items-center justify-center w-full p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegistrationForm />
      </div>
    </div>
  );
}
