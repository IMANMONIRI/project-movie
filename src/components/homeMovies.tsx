import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { FaHeart, FaImdb } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { Button } from "./ui/button";
import MoviesCart from "./moviesCart";

export default async function HomeMovies({
  titleName,
  userId,
  data,
  titleIcon,
}: {
  titleName: string;
  userId:string|undefined;
  data:{
    id:string;
    name:string;
    image:string;
    year:number;
    time:number;
    imdb:number;
    director:{name:string};
    favorites?:{id:string}[]|undefined;
    create_at?:string;
    categories_movies?:{category:{title:string}}[]
  }[]|null
  titleIcon: React.ReactElement;
}) {
  return (
    <div className="w-full container mb-8 bg-black/50 rounded-2xl p-2">
      <div className="mb-2 flex justify-between items-center px-2 pt-2">
        <div className="flex justify-start items-center space-x-1">
          {titleIcon}
          <p className="text-white text-2xl font-extrabold">{titleName}</p>
        </div>
        <div className="flex justify-start items-center group">
          <p className="text-white text-2xl font-extrabold">more</p>
          <MdKeyboardArrowRight className="text-white transition-all duration-300 group-hover:text-orange-600 text-3xl -mb-1" />
        </div>
      </div>
      <div className="w-full grid grid-flow-col grid-rows-2 gap-3 p-2 overflow-x-auto">
        {data?.map(d => (
          <MoviesCart
            key={d?.id}
            id={d?.id}
            name={d?.name}
            img={d?.image}
            categories={d?.categories_movies}
            rate={d?.imdb}
            time={d?.time}
            year={d?.year}
            director={d?.director?.name}
            pathName="/"
            favorites={d?.favorites}
            userId={userId}
            className="w-64 h-48"
          />
        ))}
      </div>
    </div>
  );
}
