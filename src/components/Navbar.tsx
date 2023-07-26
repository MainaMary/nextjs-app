"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { userDetailsKey, initialUserState } from "@/redux/features/usersSlice";
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
  const [currentUser, setCurrentUser] = useState(initialUserState);
  useEffect(() => {
    setCurrentUser(localStorage.getItem(userDetailsKey) as unknown as User);
  }, [currentUser]);
 console.log(Object.keys(currentUser).length > 0)
 console.log(currentUser.name,'user name')
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
        {Object.keys(currentUser).length > 0 ? (
          <div>
            <p className="text-color-400">{currentUser.name}</p>
          </div>
        ) : (
          <Link href={"/auth"}>
            <button>Sign in</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
