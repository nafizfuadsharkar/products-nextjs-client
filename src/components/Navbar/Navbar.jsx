"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/Provider/AuthProvider";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start */}{" "}
      <div className="navbar-start">
        {" "}
        <div className="dropdown">
          {" "}
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>{" "}
          </label>{" "}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {" "}
            <li>
              {" "}
              <Link href="/">Home</Link>{" "}
            </li>{" "}
            <li>
              {" "}
              <Link href="/products">Products</Link>{" "}
            </li>{" "}
            <li>
              {" "}
              <Link href="/about">About</Link>{" "}
            </li>
            {!user && (
              <>
                {" "}
                <li>
                  {" "}
                  <Link href="/login">Login</Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href="/register">Register</Link>{" "}
                </li>
              </>
            )}
            {user && (
              <>
                {" "}
                <li>
                  {" "}
                  <span>Hello, {user.displayName || "User"}</span>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href="/add-product">addProduct</Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href="/manageProducts">Manage Products</Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <button onClick={handleLogout}>Logout</button>{" "}
                </li>
              </>
            )}{" "}
          </ul>{" "}
        </div>{" "}
        <Link href="/" className="btn btn-ghost text-xl">
          DaisyUI{" "}
        </Link>{" "}
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="dropdown dropdown-hover">
                <label tabIndex={0} className="cursor-pointer">
                  Hello, {user.displayName || "User"}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/addProduct">Add Product</Link>
                  </li>
                  <li>
                    <Link href="/manageProducts">Manage Products</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          <Link href="/login" className="btn">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
