"use client";

import Collection from "@/components/Collection";
import Masonry from "@/components/Masonry";
import * as React from "react";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../../../data/category";
import Tag from "@/components/Tag";

export interface IListPhotosProps {}

export default function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const [images, setImages] = useState<any>([]);
  const listname = params?.photos ? params?.photos[0] : "photos";

  const fetchData = async () => {
    try {
      const res = await fetch(
        `/api/user?username=${params.username}&listname=${
          params.photos ? params.photos[0] : "photos"
        }&per_page=10`
      );
      // console.log(res);
      const data = await res.json();
      // console.log(data?.data);
      setImages(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(params?.photos);
  }, [params.photos]);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        {listname === "collections" ? (
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2">
            {images?.map((col: any, i: number) => (
              <Collection key={i} data={col} username={params.username} />
            ))}
          </div>
        ) : (
          <>
            <Masonry images={images} />
            <div className="py-12">
              <button className="h-16 bg-white border border-border text-grey px-4 w-full rounded font-medium hover:border-black hover:text-black">
                Load more
              </button>
            </div>
            <div className="flex flex-col gap-6 py-5">
              <p className="text-2xl font-semibold leading-[1.3]">
                Pawel's work appears in the following categories
              </p>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES?.map((cate: any, i: number) => (
                  <Tag name={cate} key={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}