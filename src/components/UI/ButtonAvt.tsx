"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { tokenStore, userStore } from "@/store/userStore";
import { toastStore } from "@/store/toastStore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { CLIENT_ID } from "@/services/index";
import Router from "next/router";
import path from "path";

export interface IButtonAvtProps {
  // src: string;
  // username: string;
}

export default function ButtonAvt(props: IButtonAvtProps) {
  const router = useRouter();
  const pathname = usePathname().split("/");

  const { user, clearUser } = userStore();
  const { clearToken } = tokenStore();
  const { setToast } = toastStore();

  const ref = useRef<HTMLInputElement>(null);

  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    if (pathname[1] === "account") {
      router.push("/");
    } else {
      window.location.reload();
    }
    setSelect(false);
    setToast("Successfully logged out");
    clearUser();
    clearToken();
  };

  useEffect(() => {
    setLoading(true);
  }, [user]);

  useEffect(() => {
    if (!select) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSelect(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [select]);

  return (
    <>
      {user && loading ? (
        <div className="relative w-15 text-center" ref={ref}>
          {select && (
            <div className="absolute z-[1] top-11 shadow-popup rounded min-w-[200px] origin-top-left py-2 bg-white border border-border right-4 flex flex-col">
              <div className="absolute size-2.5 top-[-6px] z-[2] border-t border-l border-border rotate-45 bg-white right-2"></div>
              <Link href={`/${user.username}`}>
                <button
                  className="h-10 w-full px-4 py-2 text-grey-bold hover:bg-gray-100 text-start z-[3]"
                  onClick={() => setSelect(false)}
                >
                  View profile
                </button>
              </Link>
              <Link href={`/${user.username}/likes`}>
                <button
                  className="h-10 w-full px-4 py-2 text-grey-bold hover:bg-gray-100 text-start z-[3]"
                  onClick={() => setSelect(false)}
                >
                  Likes
                </button>
              </Link>
              <Link href="/account">
                <button
                  className="h-10 w-full px-4 py-2 text-grey-bold hover:bg-gray-100 text-start z-[3]"
                  onClick={() => setSelect(false)}
                >
                  Account settings
                </button>
              </Link>
              <div className="h-[1px] w-full bg-border my-2"></div>
              <button
                className="h-10 w-full px-4 py-2 text-grey-bold hover:bg-gray-100 text-start z-[3] truncate"
                onClick={handleLogout}
              >
                Logout @{user?.username || ""}
              </button>
            </div>
          )}
          <button
            className="rounded-full relative border size-8"
            onClick={() => setSelect(!select)}
          >
            <Image
              src={
                user?.profile_image?.small ||
                "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
              }
              fill
              alt=""
              className="rounded-full"
            />
          </button>
        </div>
      ) : (
        <Link
          href={`https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID[0]}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=public+write_likes+read_photos+read_collections+read_user+write_user`}
        >
          <button className="px-2.75 h-14 w-max font-medium hover:text-black text-grey">
            Log in
          </button>
        </Link>
      )}
    </>
  );
}
