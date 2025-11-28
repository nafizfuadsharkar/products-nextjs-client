"use client";

import React, { useState, useContext, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/app/Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("redirect") || "/";

  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const handleLogIn = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Logged in Successfully!");
        router.push(from);
      })
      .catch((err) => {
        setError(err.code || "Something went wrong");
        toast.error("Login failed!");
      });
  };

  // Redirect to Forgot Password page
  const handleRedirectToForgotPassword = () => {
    const emailInput = document.querySelector('input[name="email"]').value;

    if (!emailInput) {
      toast("Please enter your email first!");
      return;
    }

    router.push(`/forgot-password?email=${emailInput}`);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in Successfully!");
        router.push(from);
      })
      .catch((err) => {
        setError(err.code);
        toast.success("Logg in Failed!");
      });
  };

  return (
    <div className="flex justify-center items-center flex-1 min-h-screen">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="card bg-base-100 w-full max-w-sm shadow-xl py-5">
          <h2 className="text-2xl font-semibold text-center">
            Login Your Account
          </h2>

          <div className="card-body">
            <form onSubmit={handleLogIn}>
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  required
                  placeholder="Email"
                />

                {/* Password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  required
                  placeholder="Password"
                />

                {/* Forgot Password */}
                <div>
                  <button
                    type="button"
                    onClick={handleRedirectToForgotPassword}
                    className="link link-hover"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button type="submit" className="btn btn-primary mt-4">
                  Login
                </button>

                <p className="font-semibold mt-3">
                  Don’t have an account?{" "}
                  <Link href="/auth/register" className="text-blue-500">
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>

            <div className="mt-3">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Login;
