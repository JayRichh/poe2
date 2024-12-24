import Link from "next/link";

import { AuthForm } from "~/components/auth/AuthForm";
import { Alert } from "~/components/ui/Alert";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Container className="max-w-md py-12">
        <div className="space-y-8">
          <div className="flex flex-col w-full">
            <Text className="text-3xl text-center font-bold">Create Account</Text>
            <Text className="text-foreground/60 text-center mt-2">
              Join POE2 Tools to get started
            </Text>
          </div>

          <Alert variant="info" className="text-sm">
            Site is very much WIP but constantly developing new features and improvements daily!
          </Alert>

          <AuthForm type="signup" />

          <div className="text-center">
            <Text className="text-sm text-foreground/60">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
}
