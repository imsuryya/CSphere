// src/pages/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  applyActionCode, 
  sendEmailVerification, 
   
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else if (currentUser?.email) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="code-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="code-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Verify code
      await applyActionCode(auth, verificationCode);
      
      setMessage("Email verified successfully! Redirecting to dashboard...");
      
      // Clear stored email
      sessionStorage.removeItem('userEmail');
      
      // Redirect to dashboard after small delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setError(error.message || "Failed to verify email. Please try again.");
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!currentUser && !email) {
      setError("No email found. Please try signing in again.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // If currentUser exists, use it; otherwise try to get the user from auth state
      const user = currentUser || auth.currentUser;
      
      if (user) {
        await sendEmailVerification(user, {
          url: window.location.origin + '/dashboard',
          handleCodeInApp: true,
        });
        setMessage("Verification code has been resent to your email");
      } else {
        setError("You need to be logged in to resend the verification code");
      }
    } catch (error) {
      setError(error.message || "Failed to resend code. Please try again.");
      console.error("Resend code error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-md p-6">
        <div className="space-y-3 items-center text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Verify Your Email</h2>
          <p className="text-sm text-gray-500">
            We&apos;ve sent a code to {email || "your email"}. Enter it below to verify your account.
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {message && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        <div className="mt-6">
          <div className="flex gap-2 justify-center my-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                name={`code-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md"
                maxLength={1}
              />
            ))}
          </div>
          <button 
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
        <div className="mt-4 text-sm text-center space-y-2">
          <div className="text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button 
              onClick={handleResendCode} 
              className="text-black hover:underline disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend code"}
            </button>
          </div>
          <div className="text-gray-600">
            Back to{" "}
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}