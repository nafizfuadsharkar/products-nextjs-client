"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/Provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogle } =
    useContext(AuthContext);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      toast("Password must be at least 6 characters long");
      return;
    }
    if (!uppercaseRegex.test(password)) {
      toast("Password must include at least one uppercase letter");
      return;
    }
    if (!lowercaseRegex.test(password)) {
      toast("Password must include at least one lowercase letter");
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: photo });

      setUser({ ...user, displayName: name, photoURL: photo });

      toast.success("Registered Successfully!");
      router.push("/");

    } catch (error) {
      toast("Error: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Signed up with Google!");
      router.push("/");
    } catch (error) {
      toast("Google sign-up failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="text-2xl font-semibold text-center">
          Register Your Account
        </h2>

        <div className="card-body">
          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input type="text" name="name" required className="input" />

            <label className="label">Email</label>
            <input type="email" name="email" required className="input" />

            <label className="label">Photo URL</label>
            <input type="text" name="photo" required className="input" />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input"
            />

            <button type="submit" className="btn btn-primary mt-4 w-full">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignUp}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="mt-4 text-center font-semibold">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
