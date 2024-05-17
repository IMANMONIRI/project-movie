import Image from "next/image";
import { FaHeart, FaCalendarAlt, FaAward, FaUser } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled, MdCategory, MdMovieEdit } from "react-icons/md";
import MoviesCart from "@/components/moviesCart";
import Link from "next/link";
import { RiMovie2Fill } from "react-icons/ri";
import { createClient } from '@/utils/supabase/server'

type MovieType={
  movie?:{
    id?:string;
    name?:string;
    image?:string;
    director?:{name?:string};
    favorites?:{id?:string;userId?:string}[];
    year?:number;
    time?:number;
    imdb?:number;
    create_at?:string;
    categories_movies?:{category:{title:string}}[]
  }
}

async function getData(actor:string){
  const supabase = createClient();
  const { data, error } = await supabase
    .from('actors')
    .select('*,actors_movies(movie(id,name,image,director(name),favorites(id,userId),year,time,imdb,create_at,categories_movies(category(title))))')
    .eq('id',actor)
  return data && data[0]
}

export default async function Movie({
  params: { actor }
}: {
  params: { actor: string };
}) {
  const supabase = createClient();
  const { data:user, error } = await supabase.auth.getUser()
  const data=await getData(actor)
  return (
    <>
      <div className="w-full h-[40vh] lg:h-[50vh] relative">
        <Image
          className="w-full h-full object-cover"
          width={300}
          height={300}
          alt="img"
          src={data?.image}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#012] via-[#0125] to-[#012] flex justify-center items-center" />
        <div className="absolute top-1/3 left-8 md:left-16 lg:left-28 xl:left-48 2xl:left-64 w-[150px] h-[250px] sm:w-[200px] sm:h-[330px] md:w-[250px] md:h-[410px] lg:w-[300px] lg:h-[500px] 2xl:w-[350px] 2xl:h-[580px] overflow-hidden rounded-2xl border border-gray-500 p-0.5">
          <Image
            className="w-full h-full object-cover rounded-xl"
            width={1000}
            height={1000}
            alt="img"
            src={data?.image}
          />
        </div>
        <div className="absolute top-2/3 flex flex-col flex-wrap justify-start items-center gap-y-4 mt-4 sm:mt-8 mr-2 ml-52 md:ml-96 md:mt-16 lg:ml-[450px] xl:ml-[550px] 2xl:ml-[650px]">
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
            {data?.name}
          </p>
          <div className="flex flex-col items-start sm:flex-row gap-y-2 justify-start sm:items-center">
            <div className="flex justify-start items-center">
              <FaCalendarAlt className="text-orange-600 md:text-2xl lg:text-3xl xl:text-4xl" />
              <span className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">
                age: {data?.age}
              </span>
            </div>
            <div className="flex justify-start items-center">
              <FaAward className="text-orange-600 md:text-2xl lg:text-3xl xl:text-4xl" />
              <span className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">
                oscar: {data?.oscar}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full mt-28 sm:mt-44 md:mt-64 lg:mt-80">
        <div className="w-full mb-8 p-2 bg-black/50 rounded-2xl">
          <div className="mb-2 flex justify-between items-center px-2 pt-2">
            <div className="flex justify-start items-center space-x-1">
              <FaUser className="text-orange-600 text-3xl" />
              <p className="text-white text-2xl font-extrabold">Biography</p>
            </div>
          </div>
          <div className="p-2 text-white lg:text-lg">
            {data?.biography?.split("\n")?.map((des:string,i:number)=><p key={i} className="mb-4">{des}</p>)}
          </div>
        </div>
        <div className="w-full mb-8 p-2 bg-black/50 rounded-2xl">
          <div className="mb-2 flex justify-between items-center px-2 pt-2">
            <div className="flex justify-start items-center space-x-1">
              <RiMovie2Fill className="text-orange-600 text-3xl" />
              <p className="text-white text-2xl font-extrabold">Movies</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-2">
            {data?.actors_movies?.map((movie:MovieType) => (
              <MoviesCart
                key={movie?.movie?.id}
                id={movie?.movie?.id}
                name={movie?.movie?.name}
                img={movie?.movie?.image}
                categories={movie?.movie?.categories_movies}
                rate={movie?.movie?.imdb}
                time={movie?.movie?.time}
                year={movie?.movie?.year}
                director={movie?.movie?.director?.name}
                favorites={movie?.movie?.favorites?.filter(favorite=>favorite?.userId===user?.user?.id)}
                pathName={`/actors/${data?.id}`}
                userId={user?.user?.id}
                className="w-full h-52"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
