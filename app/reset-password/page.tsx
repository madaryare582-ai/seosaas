import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account Recovery"
      headline="Reset Your Password"
      description="Enter your email address and we'll send you a reset link."
      footer={
        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            Back to login
          </Link>
        </p>
      }
    >
      <ResetPasswordForm />
    </AuthShell>
  )
}
