"use client";

import Collection from "@/components/collection/Collection";
import Masonry from "@/components/photo/Masonry";
import * as React from "react";
import { useState, useEffect } from "react";
import Tag from "@/components/UI/Tag";
import Empty from "@/components/Empty";
import ListData from "@/components/ListData";
import Loading from "@/components/Loading";

export interface IListPhotosProps {}

export default function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const [images, setImages] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const listname = params?.photos ? params?.photos[0] : "photos";
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/user?username=${params.username}&listname=${
          params.photos ? params.photos[0] : "photos"
        }&per_page=20`
      );
      const data = await res.json();
      // console.log(data?.data);
      setImages(data?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user?username=${params?.username}`);
      const data = await res.json();
      // console.log(data?.data?.tags?.aggregated);
      setCategories(data?.data?.tags?.aggregated);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [params?.username]);

  useEffect(() => {
    fetchData();
    // console.log(params?.photos);
  }, [params.photos]);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        {isLoading && (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <Loading className="flex" />
          </div>
        )}
        {images?.length > 0 ? (
          listname === "collections" ? (
            <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {images?.map((col: any, i: number) => (
                <Collection key={i} data={col} username={params.username} />
              ))}
            </div>
          ) : (
            <>
              <ListData data={images} />
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
                  {categories?.map((cate: any, i: number) => (
                    <Tag name={cate?.source?.title || cate?.title} key={i} />
                  ))}
                </div>
              </div>
            </>
          )
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
