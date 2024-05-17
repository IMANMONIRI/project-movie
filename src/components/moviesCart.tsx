import { MdAccessTimeFilled } from "react-icons/md";
import Image from "next/image";
import { FaHeart, FaImdb } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { Button } from "./ui/button";
import Link from "next/link"
import AddFavoriteButton from "@/components/addFavoriteButton"
import DeleteFavoriteButton from "@/components/deleteFavoriteButton"
import {AddFavoriteAction,DeleteFavoriteAction} from "@/action"
import { createClient } from '@/utils/supabase/server'

export default async function MoviesCart({
  id,
  name,
  img,
  categories,
  rate,
  time,
  year,
  director,
  favorites,
  pathName,
  userId,
  className
}: {
  id: string|undefined;
  name: string|undefined;
  img: string|undefined;
  categories: {category:{title:string}}[]|undefined;
  rate: number|undefined;
  time: number|undefined;
  year: number|undefined;
  director: string|undefined;
  favorites:{id?:string|undefined,userId?:string|undefined}[]|undefined;
  pathName:string|undefined;
  userId:string|undefined;
  className:string|undefined
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl group transition-all duration-300 hover:scale-105 border border-gray-500 hover:border-white p-0.5 ${className}`}>
      {img && <Image
              className="w-full h-full object-cover rounded-xl"
              width={1000}
              height={1000}
              alt="img"
              src={img}
            />}
      <div className="absolute top-0 left-0 w-full h-full z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-black/50 flex flex-col justify-between items-start p-6">
        <p className="text-2xl font-extrabold">{name}</p>
        <div className="flex justify-start items-center">
          <FaImdb className="text-orange-600" />
          <span className="text-xs font-bold ml-1 mr-2">{rate}</span>
          <BsCalendarDateFill className="text-orange-600" />
          <span className="text-xs font-bold ml-1 mr-2">{year}</span>
          <MdAccessTimeFilled className="text-orange-600" />
          {time && <span className="text-xs font-bold ml-1 mr-2">{Math.floor(time/60)}h {time%60}m</span>}
        </div>
        {categories && <p className="text-sm font-extrabold">{categories.map(category=>category?.category?.title).join(" , ")}</p>}
        <p className="text-sm font-extrabold">Director: {director}</p>
        <div className="flex justify-center items-center gap-x-2">
          <Link
            href={`/movies/${id}`}
            className="bg-gradient-to-br from-orange-600 from-30% via-amber-600 to-orange-700  text-white hover:from-orange-800 hover:via-amber-700 hover:to-orange-800 px-3 py-2 rounded-xl"
          >
            watch
          </Link>
          {userId && favorites?.length===0 && (
            <form action={AddFavoriteAction}>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="movieId" value={id} />
              <input type="hidden" name="pathName" value={pathName} />
              <AddFavoriteButton />
            </form>
          )}
          {userId && favorites?.length!==0 && (
            <form action={DeleteFavoriteAction}>
              <input type="hidden" name="favoriteId" value={favorites && favorites[0].id} />
              <input type="hidden" name="pathName" value={pathName} />
              <DeleteFavoriteButton />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
