// src/pages/VerifyEmail.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
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

  const handleVerify = () => {
    const verificationCode = code.join("");
    // Handle verification logic here
    console.log("Verifying code:", verificationCode);
  };

  const handleResendCode = () => {
    // Handle resend logic here
    console.log("Resending code");
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
          <p className="text-sm text-gray-500">We&apos;ve sent a code to your email. Enter it below to verify your account.</p>
        </div>
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
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
        <div className="mt-4 text-sm text-center space-y-2">
          <div className="text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button onClick={handleResendCode} className="text-black hover:underline">
              Resend code
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