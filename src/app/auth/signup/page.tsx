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
            <Text className="text-3xl text-center font-bold">Authentication Temporarily Disabled</Text>
            <Text className="text-foreground/60 text-center mt-2">
              Account creation is currently unavailable. Please enjoy the site without authentication.
            </Text>
          </div>

          <Alert variant="info" className="text-sm">
            Authentication features are temporarily disabled. All tools and features are available without signing in.
          </Alert>

          {/* <AuthForm type="signup" /> */}

          {/* <div className="text-center">
            <Text className="text-sm text-foreground/60">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </Text>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
