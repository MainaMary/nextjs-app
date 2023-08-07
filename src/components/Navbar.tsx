"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { AuthTypes } from "@/redux/features/usersSlice";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/model/types";

const navLinks = [
  {
    label: "Home",
    path: "/",
    id: "1",
  },
  {
    label: "My Feed",
    path: "/feed",
    id: "2",
  },
  {
    label: "My profile",
    path: "/profile",
    id: "3",
  },
];
export default function NavBar() {
  const [currentUser, setCurrentUser] = useState(
    {
     
        id: '',
        email:'',
        password: '',
        __v: 0,
    }
    
  );
  useEffect(() => {
    // Use localStorage to retrieve the user data and set the currentUser state.
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setCurrentUser(parsedUser ?? {
      _id: '',
      email: '',
      password: '',
      __v: 0,
    });
  }, [])


console.log({currentUser})
  return (
    <nav className=" top-0 left-0fixed flex w-full h-20 items-center px-12 bg-slate-500 justify-between">
      <Link href="/" className="text-white font-bold">
        BlogsSite
      </Link>
      <ul className="flex w-[20%] justify-between">
        {navLinks.map((list) => (
          <li key={list.id}>
            <Link href={list.path}>{list.label}</Link>
          </li>
        ))}
      </ul>
      <div>
     
        {currentUser ? (
          <div>
            <p className="text-color-400">{currentUser.email}</p>
          </div>
        ) : (
          <Link href={"/auth/signin"}>
            <button>Sign in</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
