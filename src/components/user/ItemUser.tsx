import Link from "next/link";
import * as React from "react";
import Avatar from "../UI/Avatar";
import Image from "next/image";
import { blurHashToDataURL } from "@/ultils/blurhashDataURL";
import { IDetailUser } from "@/interfaces/detailUser";
import { IPreviewPhoto } from "@/interfaces/collection";

export interface IItemUserProps {
  data: IDetailUser;
}

export default function ItemUser(props: IItemUserProps) {
  const { data } = props;
  return (
    <div className="p-4 flex flex-col gap-4 justify-between border border-border hover:border-black rounded-lg">
      <Link
        href={`/${data?.username}`}
        className="flex gap-4 items-center h-max"
      >
        <div className="flex size-16">
          <Avatar src={data?.profile_image?.medium} className="roudh-16 w-16" />
        </div>
        <div className=" w-[calc(100%-80px)]">
          <div className="flex flex-col justify-between w-full">
            <p className="text-lg font-semibold truncate">{data?.name}</p>
            <p className="text-nor text-grey truncate">{data?.username}</p>
          </div>
        </div>
      </Link>
      {data?.photos?.length ? (
        <Link href={`/${data?.username}`} className="grid grid-cols-3 gap-2">
          {data?.photos?.map((item: IPreviewPhoto, i: number) => (
            <div className="aspect-[4/3]" key={i}>
              <Image
                height={0}
                width={0}
                alt=""
                src={item.urls.raw}
                className="size-full"
                style={{ objectFit: "cover" }}
                sizes="100vw"
                placeholder="blur"
                blurDataURL={blurHashToDataURL(item?.blur_hash)}
              />
            </div>
          ))}
        </Link>
      ) : (
        <></>
      )}
      <Link href={`/${data?.username}`}>
        <button className="text-grey border border-border rounded px-2.75 h-8 w-full text-sm hover:border-black hover:text-black">
          View profile
        </button>
      </Link>
    </div>
  );
}
