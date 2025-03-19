import LoginForm from "../components/auth/LoginForm"; // Fixed casing to lowercase "components"

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}