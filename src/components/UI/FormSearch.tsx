"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GrSearch } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";
import { OPTIONS } from "../../app/s/[...category]/page";

export interface IFormSearchProps {
  className?: String;
}

export default function FormSearch(props: IFormSearchProps) {
  const router = useRouter();
  const refOption = useRef<HTMLInputElement>(null);
  const refSearch = useRef<HTMLInputElement>(null);

  const pathname = usePathname().split("/");
  const isSearch =
    pathname.length === 4 &&
    pathname[1] === "s" &&
    OPTIONS.includes(pathname[2]);

  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [option, setOption] = useState(isSearch ? pathname[2] : OPTIONS[0]);
  const [isShowOption, setIsShowOption] = useState(false);
  const [isShownSearch, setIsShownSearch] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/s/${option}/${value}`);
    addValueSearch(value);
    setIsShownSearch(false);
  };

  const addValueSearch = (value: string) => {
    if (!recentSearch.includes(value) && value.trim()) {
      setRecentSearch([...recentSearch, value]);
      localStorage.setItem(
        "recentSearch",
        JSON.stringify([...recentSearch, value])
      );
    }
  };

  const handleClickOption = (item: string) => {
    setOption(item);
    setIsShowOption(false);
    if (isSearch) {
      router.push(`/s/${item}/${value}`);
    }
  };

  const handleClickRecent = (recentValue: string) => {
    setValue(recentValue);
    router.push(`/s/${option}/${value}`);
    setIsShownSearch(false);
  };

  const handleClearRecent = () => {
    setRecentSearch([]);
    localStorage.setItem("recentSearch", JSON.stringify([]));
    setIsShownSearch(false);
  };

  useEffect(() => {
    if (!isShowOption && !isShownSearch) return;

    const clickOutSideOption = (e: MouseEvent) => {
      if (refOption.current && !refOption.current.contains(e.target as Node)) {
        setIsShowOption(false);
      }
    };

    const clickOutSideSearch = (e: MouseEvent) => {
      if (refSearch.current && !refSearch.current.contains(e.target as Node)) {
        setIsShownSearch(false);
      }
    };

    if (isShowOption) {
      window.addEventListener("mousedown", clickOutSideOption);
      return () => window.removeEventListener("mousedown", clickOutSideOption);
    }

    if (isShownSearch) {
      window.addEventListener("mousedown", clickOutSideSearch);
      return () => window.removeEventListener("mousedown", clickOutSideSearch);
    }
  }, [isShowOption, isShownSearch]);

  useEffect(() => {
    if (isSearch) {
      setOption(pathname[2]);
    }
  }, [pathname]);

  useEffect(() => {
    if (!localStorage.getItem("recentSearch")) {
      localStorage.setItem("recentSearch", JSON.stringify([]));
    }
    setRecentSearch(JSON.parse(localStorage.getItem("recentSearch") || "[]"));
    if (isSearch) {
      setValue(pathname[3]);
    }
  }, []);

  return (
    <div
      className={
        "flex items-center grow text-text relative rounded-3xl h-full border " +
        props?.className
      }
    >
      <div className="has-[:focus]:bg-white group flex items-center grow relative rounded-l-3xl h-full bg-[#eee] hover:bg-[#e7e7e7] ">
        {isShownSearch && (
          <div
            ref={refSearch}
            className="absolute w-full h-[100px] top-[45px] left-0 border shadow rounded-lg p-4 bg-white"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <p className="capitalize">Recent searches</p>
                <div className="h-[2px] w-[2px] bg-grey rounded-full"></div>
                <button
                  className="border-0 text-grey"
                  onClick={handleClearRecent}
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearch?.map((item: string, i: number) => (
                  <button
                    key={i}
                    className="py-2 px-4 rounded border border-border text-grey hover:bg-gray-100"
                    onClick={() => handleClickRecent(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <button className="flex items-center h-full">
          <GrSearch className="w-8 h-8 pl-[14px] text-grey hover:text-black" />
        </button>
        <form
          onSubmit={onFormSubmit}
          className="flex items-center grow text-text bg-inherit h-full"
        >
          <input
            type="text"
            onFocus={() => {
              if (recentSearch.length > 0) {
                setIsShownSearch(true);
              }
            }}
            value={value.trim()}
            onChange={(e) => handleOnChange(e)}
            placeholder="Search high-resolution images"
            required
            className="bg-inherit border-none outline-none flex grow items-center w-full h-[37px] pl-[10px] placeholder:text-grey"
          />
        </form>
        {value && (
          <div className="flex items-center justify-center bg-inherit w-12 border-[#c4c4c4]">
            <button
              className="flex items-center bg-inherit  justify-center h-max "
              onClick={() => setValue("")}
            >
              <IoCloseOutline className="h-5 w-5 text-grey hover:text-black" />
            </button>
          </div>
        )}
      </div>
      <div className="h-full relative w-32">
        {isShowOption && (
          <div
            ref={refOption}
            className="absolute top-[45px] left-0 w-full bg-white shadow border rounded-lg flex flex-col gap-1 text-grey py-[6px]"
          >
            {OPTIONS.filter((item: string) => item !== option).map(
              (item: string, i: number) => (
                <button
                  key={i}
                  className="capitalize hover:bg-[#e7e7e7] bg-inherit px-4 py-2"
                  onClick={() => handleClickOption(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}
        <button
          onClick={() => setIsShowOption(!isShowOption)}
          className="flex items-center justify-center bg-white w-full h-full capitalize rounded-r-3xl text-grey gap-2 border-l-2 border-l-border"
        >
          {option}
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}
