"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", ""])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple digits

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(`input[name="code-${index + 1}"]`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="code-${index - 1}"]`) as HTMLInputElement
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerify = () => {
    const verificationCode = code.join("")
    // Handle verification logic here
    console.log("Verifying code:", verificationCode)
  }

  const handleResendCode = () => {
    // Handle resend logic here
    console.log("Resending code")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95">
      <Card className="w-full max-w-md mx-4 bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="space-y-3 items-center text-center">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-semibold">Reset Password</CardTitle>
          <p className="text-sm text-zinc-400">Enter your email to reset your password.</p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 justify-center my-4">
            {code.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                name={`code-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg bg-zinc-800 border-zinc-700 text-white"
                maxLength={1}
              />
            ))}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleVerify}>
            Verify
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-sm text-center">
          <div className="w-full text-zinc-400">
            Are you facing any problems with receiving the code?{" "}
            <button onClick={handleResendCode} className="text-blue-500 hover:text-blue-400">
              Resend code
            </button>
          </div>
          <div className="w-full text-zinc-400">
            Remember your password? <button className="text-blue-500 hover:text-blue-400">Go Back</button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

