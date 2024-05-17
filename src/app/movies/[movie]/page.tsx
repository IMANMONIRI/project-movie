import Image from "next/image";
import { FaHeart, FaImdb } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled, MdCategory, MdMovieEdit } from "react-icons/md";
import HomeActors from "@/components/homeActors";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { FaUser } from "react-icons/fa";

async function getData(movie: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("movies")
    .select(
      "*,director(name,image),actors_movies(actor(id,name,image)),categories_movies(category(title))"
    )
    .eq("id", movie);
  return data && data[0];
}

export default async function Movie({
  params: { movie },
}: {
  params: { movie: string };
}) {
  const data = await getData(movie);
  const Lazytrailer = dynamic(() => import("@/components/trailer"), {
    ssr: false,
    loading: () => (
      <>
        <div className="mb-4 flex justify-start items-center gap-x-2">
          <Skeleton className="w-32 h-12" />
          <Skeleton className="w-32 h-12" />
        </div>
        <Skeleton className="w-[300px] h-[169px] min-[480px]:w-[400px] min-[480px]:h-[225px] sm:w-[560px] sm:h-[315px] md:w-[696px] md:h-[391.5px] lg:w-[960px] lg:h-[540px] xl:w-[1200px] xl:h-[675px] rounded-xl mx-auto mb-16" />
      </>
    ),
  });
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
        <div className="absolute top-2/3 flex flex-col flex-wrap justify-start items-center gap-y-4 mt-4 sm:mt-8 mr-2 ml-52 sm:ml-64 md:ml-96 md:mt-16 lg:ml-[450px] xl:ml-[550px] 2xl:ml-[650px]">
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
            {data?.name}
          </p>
          <div className="flex flex-col items-start min-[400px]:flex-row justify-start min-[400px]:items-center">
            <div className="flex justify-start items-center">
              <FaImdb className="text-orange-600 md:text-2xl lg:text-3xl xl:text-4xl" />
              <span className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">
                {data?.imdb}
              </span>
            </div>
            <div className="flex justify-start items-center">
              <BsCalendarDateFill className="text-orange-600 md:text-2xl lg:text-3xl xl:text-4xl" />
              <span className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">
                {data?.year}
              </span>
            </div>
            <div className="flex justify-start items-center">
              <MdAccessTimeFilled className="text-orange-600 md:text-2xl lg:text-3xl xl:text-4xl" />
              <span className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">
                {Math.floor(data?.time / 60)}h {data?.time % 60}m
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full mt-28 sm:mt-44 md:mt-64 lg:mt-80">
        <Lazytrailer src={{ youtube: data?.youtube, aparat: data?.apart }} />
        <div className="w-full mb-8 p-2 bg-black/50 rounded-2xl">
          <div className="mb-2 flex justify-between items-center px-2 pt-2">
            <div className="flex justify-start items-center space-x-1">
              <MdCategory className="text-orange-600 text-3xl" />
              <p className="text-white text-2xl font-extrabold">Categories</p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-wrap gap-2 p-2">
            {data?.categories_movies?.map(
              (category: { category: { title: string } }) => (
                <Link
                  href="/"
                  key={category?.category?.title}
                  className="text-sm lg:text-base text-white bg-gradient-to-br from-orange-600 from-30% via-amber-700 to-orange-700 font-bold px-4 py-2 rounded-full"
                >
                  {category?.category?.title}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="w-full mb-8 p-2 bg-black/50 rounded-2xl">
          <div className="mb-2 flex justify-between items-center px-2 pt-2">
            <div className="flex justify-start items-center space-x-1">
              <MdMovieEdit className="text-orange-600 text-3xl" />
              <p className="text-white text-2xl font-extrabold">Storyline</p>
            </div>
          </div>
          <div className="p-2 text-white lg:text-lg">
            {data?.description?.split("\n")?.map((des: string, i: number) => (
              <p key={i} className="mb-4">
                {des}
              </p>
            ))}
          </div>
        </div>
        <HomeActors
          row="grid-rows-1"
          more={false}
          actors={data?.actors_movies?.map(
            (actor: { actor: { id: string; name: string; image: string } }) =>
              actor?.actor
          )}
        />
        <div className="w-full mb-8 p-2 bg-black/50 rounded-2xl">
          <div className="mb-2 flex justify-between items-center px-2 pt-2">
            <div className="flex justify-start items-center space-x-1">
              <FaUser className="text-orange-600 text-3xl" />
              <p className="text-white text-2xl font-extrabold">Director</p>
            </div>
          </div>
          <div className="relative w-36 h-36 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 group border border-gray-500 hover:border-white p-0.5 m-2">
            <Image
              className="w-full h-full object-cover rounded-full"
              width={1000}
              height={1000}
              alt="img"
              src={data?.director?.image}
            />
            <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 bg-transparent transition-all duration-300 group-hover:bg-black/30 z-20">
              <p className="text-center text-transparent text-xl font-extrabold transition-all duration-300 group-hover:text-orange-500">
                {data?.director?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
