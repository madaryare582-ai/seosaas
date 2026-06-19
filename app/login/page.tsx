import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <AuthShell
      chrome="full"
      eyebrow="Sign In"
      headline="Welcome Back"
      description="Sign in to continue managing your SEO workflow."
      footer={
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
