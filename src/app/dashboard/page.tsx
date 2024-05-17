import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import ChangeUser from "@/components/changeUser";
import MoviesCart from "@/components/moviesCart";
import { RiMovie2Fill } from "react-icons/ri";

type MovieType={
  movies?:{
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

async function getData(userId: string) {
  const supabase = createClient();
  const { data: users, error } = await supabase
    .from("users")
    .select(
      "*,favorites(id,movies(id,name,image,director(name),favorites(id,userId),year,time,imdb,create_at,categories_movies(category(title))))"
    )
    .eq("id", userId);
  return users && users[0];
}

export default async function Dashboard() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signup-login");
    return null;
  }

  const user = await getData(data.user?.id);

  return (
    <div className="w-full container p-4">
      <div className="w-full p-8 rounded-xl bg-slate-800 flex justify-between items-center px-32 mb-8">
        <div className="relative w-36 h-36 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 group border border-gray-500 hover:border-white p-0.5">
          {user?.img ? (
            <Image
              className="w-full h-full object-cover rounded-full"
              width={1000}
              height={1000}
              alt="img"
              src={user.img}
            />
          ) : (
            <FaHeart className="text-2xl text-center" />
          )}
        </div>
        <div className="flex justify-center items-center gap-12">
          <p className="text-md text-gray-300 font-extrabold">
            Name:
            <span className="text-2xl text-orange-500 ml-2">{user?.name}</span>
          </p>
          <p className="text-md text-gray-300 font-extrabold">
            Email:
            <span className="text-2xl text-orange-500 ml-2">{user?.email}</span>
          </p>
        </div>
        <ChangeUser userId={data?.user?.id} name={user?.name} img={user?.img} />
      </div>
      <div className="w-full mb-8 p-2 bg-black/50 rounded-2xl">
        <div className="mb-2 flex justify-between items-center px-2 pt-2">
          <div className="flex justify-start items-center space-x-1">
            <RiMovie2Fill className="text-orange-600 text-3xl" />
            <p className="text-white text-2xl font-extrabold">Favorites</p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-8 p-4 bg-black/50 rounded-2xl">
          {user?.favorites?.map((movie:MovieType) => (
            <MoviesCart
              key={movie?.movies?.id}
              id={movie?.movies?.id}
              name={movie?.movies?.name}
              img={movie?.movies?.image}
              categories={movie?.movies?.categories_movies}
              rate={movie?.movies?.imdb}
              time={movie?.movies?.time}
              year={movie?.movies?.year}
              director={movie?.movies?.director?.name}
              favorites={movie?.movies?.favorites?.filter(
                (favorite) => favorite?.userId === data?.user?.id
              )}
              pathName="/dashboard"
              userId={data?.user?.id}
              className="w-full h-52"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
