import Link from "next/link";
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
  return (
    <nav className="flex h-20 items-center px-12 bg-slate-500 justify-between">
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
        <button>Sign in</button>
      </div>
    </nav>
  );
}
