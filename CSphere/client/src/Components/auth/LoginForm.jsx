import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form className="mt-8 space-y-4" onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="relative my-6 sm:my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-2 text-gray-500 bg-white">OR CONTINUE WITH</span>
        </div>
      </div>

      <button 
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-black hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
        By continuing, you agree to our{" "}
        <Link to="/terms" className="text-black hover:underline">
          Terms of Service
        </Link>
      </p>
      <div className="text-right mt-1">
        <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}