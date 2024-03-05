import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.CLIENT_ID;
  const searchParam = request.nextUrl.searchParams;
  const per_page = searchParam.get("per_page");
  const res = await fetch(
    `https://api.unsplash.com/photos?client_id=${clientId}&per_page=${per_page}`
  );
  const data = await res.json();
  return Response.json({ data });
}