import * as React from "react";
import Empty from "@/components/Empty";
import { ICollection } from "@/interfaces/collection";
import Collection from "@/components/collection/Collection";
import PageNotFound from "@/components/PageNotFound";
import ListData from "@/components/photo/ListData";
import ItemUser from "@/components/user/ItemUser";
import { IResultSearch } from "@/interfaces/search";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { formatNumber } from "@/app/[username]/layout";
import { search } from "@/services/searchService";
import { IDetailUser } from "@/interfaces/detailUser";

export const OPTIONS = ["photos", "collections", "users"];

export default async function SearchPage({
  params,
}: {
  params: { category: string[] };
}) {
  if (params.category.length !== 2 || !OPTIONS.includes(params.category[0])) {
    return <PageNotFound />;
  }

  const [category, searchValue] = [...params.category];
  const data: IResultSearch = await search(category, searchValue);

  return (
    <div className="flex justify-center">
      <div className="w-main">
        <div className="my-5">
          <h1 className="text-3xl font-bold capitalize">
            {params.category[1]}
          </h1>
          <p>About {formatNumber(data?.total)} results</p>
        </div>
        {!data?.total ? (
          <Empty />
        ) : category === "collections" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.results.map((item: ICollection, i: number) => (
              <Collection key={i} data={item} />
            ))}
          </div>
        ) : category === "photos" ? (
          <ListData data={data?.results} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.results.map((item: IDetailUser, i: number) => (
              <ItemUser key={i} data={item} />
            ))}
          </div>
        )}
        <div className="flex flex-col items-center justify-center my-20">
          <button>
            <Image src={logo} width={34} height={34} alt="" />
          </button>
          <p className="text-grey mt-2 ">Make something awesome</p>
        </div>
      </div>
    </div>
  );
}
