import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Get Started"
      headline="Create Your Account"
      description="Start organizing your content workflow with HiigsiSEO."
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            Log in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthShell>
  )
}
