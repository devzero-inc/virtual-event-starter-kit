"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState<Boolean>(false);

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className=" bg-cus-purple text-white flex item justify-between h-[15%] border-b border-cus-purple-light">
      <div className="flex items-center m-4">
        <Image
          src="/assets/devzero_logo.png"
          alt="Logo"
          width={80}
          height={80}
        />
        <h1 className=" text-3xl hidden sm:block">
          <span className="font-bold">Dev</span>
          <span>Zero</span>
        </h1>
      </div>
      <ul className="hidden md:flex gap-2 items-center w-[40%] text-lg text-cus-text">
        <Link
          href="/live-stage"
          className={`flex-1 hover:bg-cus-purple-light hover:text-white cursor-pointer h-full flex items-center justify-center text-center ${
            isActive("/live-stage") ? "border-b-4 border-b-cus-text" : ""
          }`}
        >
          Live Stage
        </Link>
        <Link
          href="/"
          className={`flex-1 hover:bg-cus-purple-light hover:text-white cursor-pointer h-full flex items-center justify-center text-center ${
            isActive("/") ? "border-b-4 border-b-cus-text" : ""
          }`}
        >
          Devzero Stage
        </Link>
        <Link
          href="/schedule"
          className={`flex-1 hover:bg-cus-purple-light hover:text-white cursor-pointer h-full flex items-center justify-center text-center ${
            isActive("/schedule") ? "border-b-4 border-b-cus-text" : ""
          }`}
        >
          Schedule
        </Link>
        <Link
          href="/speakers"
          className={`flex-1 hover:bg-cus-purple-light hover:text-white cursor-pointer h-full flex items-center justify-center text-center ${
            isActive("/speakers") ? "border-b-4 border-b-cus-text" : ""
          }`}
        >
          Speakers
        </Link>
      </ul>
      <div className=" flex items-center mr-8 md:hidden relative ">
        <button
          className="text-white bg-purple-700 hover:bg-purple-500 focus:outline-none font-medium rounded-lg  p-2.5 text-center inline-flex items-center justify-between"
          type="button"
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          {isActive("/")
            ? "Devzero Stage"
            : isActive("/schedule")
            ? "Schedule"
            : isActive('/live-stage') ? "Live Stage" : "Speakers"}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          className={` ${
            !dropdown ? "hidden" : "absolute"
          } top-[75%] z-10 bg-white divide-y divide-gray-100 w-full rounded-lg shadow dark:bg-gray-700`}
        >
          <ul className="py-2 text-gray-700 dark:text-gray-200 text-center">
            <li>
              <Link
                href="/live-stage"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                Live Stage
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                Devzero Stage
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/speakers"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                Speakers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
