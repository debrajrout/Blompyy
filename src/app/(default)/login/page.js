import LoginWithGoogle from "@/components/login-with-google";

export default function LoginPage() {
  return (
    <div className="pt-6">
      <div className="mx-auto max-w-xs p-4">
        <h1 className="mb-2 text-center text-4xl font-bold">Sign In</h1>
        <p className="mb-6 text-center text-gray-500">
          Sign in to your account using one of the methods below
        </p>
        <LoginWithGoogle />
      </div>
    </div>
  );
}
