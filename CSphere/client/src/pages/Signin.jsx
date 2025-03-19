import SigninForm from "../components/auth/SigninForm"; // Ensure path matches your folder structure

export default function Signin() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex items-center justify-center">
        <SigninForm />
      </div>
    </div>
  );
}
