import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Tag from "../UI/Tag";
import { ICollection } from "@/interfaces/collection";
import Empty from "../Empty";
import { blurHashToDataURL } from "@/ultils/blurhashDataURL";

export interface ICollectionProps {
  data: ICollection;
  username?: String;
}

export default function Collection(props: ICollectionProps) {
  const { data } = props;
  if (!data) {
    return <Empty />;
  }
  const preview_photo = data.preview_photos;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <Link href={`/collections/${data?.id}`}>
          <div className="flex flex-col gap-4">
            {data?.preview_photos?.length ? (
              <div className="aspect-collection flex gap-0.5 relative group">
                <div className="absolute top-0 left-0 h-full w-full z-10 rounded-md bg-modal-white group-hover:flex hidden"></div>
                <div className="w-2/3 h-full">
                  <div className="relative h-full">
                    {preview_photo[0]?.urls?.regular && (
                      <Image
                        src={preview_photo[0].urls.regular}
                        style={{ objectFit: "cover" }}
                        fill
                        alt="preview photo collection"
                        className="rounded-l-md size-full"
                        placeholder="blur"
                        blurDataURL={blurHashToDataURL(
                          preview_photo[0]?.blur_hash
                        )}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 w-1/3 h-full">
                  <div className="h-1/2 w-full">
                    <div className="relative aspect-[9/10] bg-bg rounded-tr-md">
                      {preview_photo[1]?.urls?.regular && (
                        <Image
                          src={preview_photo[1].urls.regular}
                          style={{ objectFit: "cover" }}
                          alt="preview photo collection"
                          sizes="100vw"
                          width={0}
                          height={0}
                          className="rounded-tr-md size-full"
                          placeholder="blur"
                          blurDataURL={blurHashToDataURL(
                            preview_photo[1]?.blur_hash
                          )}
                        />
                      )}
                    </div>
                  </div>
                  <div className="h-1/2 w-full">
                    <div className="relative aspect-[9/10] bg-bg rounded-br-md">
                      {preview_photo[2]?.urls?.regular && (
                        <Image
                          src={preview_photo[2].urls.regular}
                          style={{ objectFit: "cover" }}
                          alt="preview photo collection"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="rounded-br-md size-full"
                          placeholder="blur"
                          blurDataURL={blurHashToDataURL(
                            preview_photo[2]?.blur_hash
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-collection flex gap-0.5 relative group bg-bg rounded-md"></div>
            )}
            <div className="truncate text-lg font-semibold">{data?.title}</div>
          </div>
        </Link>
        <div className="flex gap-2 items-center text-grey text-sm">
          <p className="">{data?.total_photos || 0} images</p>
          <span className="size-px rounded-full bg-grey"></span>
          <p className="">
            Curated by {data?.user?.name}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Tag name={data?.tags[0]?.source?.title || data?.tags[0]?.title} />
        <Tag name={data?.tags[1]?.source?.title || data?.tags[1]?.title} />
        <Tag name={data?.tags[2]?.source?.title || data?.tags[2]?.title} />
      </div>
    </div>
  );
}
