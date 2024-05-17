import HeaderSlider from "@/components/headerSlider";
import ContentSlider from "@/components/contentSlider";
import HomeMovies from "@/components/homeMovies";
import { MdLocalMovies } from "react-icons/md";
import { FaImdb } from "react-icons/fa";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import HomeActors from "@/components/homeActors";
import HomeCategories from "@/components/homeCategories";
import { createClient } from '@/utils/supabase/server'
import { RiMovie2Fill } from "react-icons/ri";

type MyMovie={
  id:string;
  name:string;
  image:string;
  year:number;
  time:number;
  imdb:number;
  director:{name:string};
  favorites?:{id:string}[];
  create_at?:string|undefined;
  categories_movies?:{category:{title:string}}[]
}[]|null

type MyActor={id:string;name:string;image:string}[]

async function getActors(){
  const supabase = createClient();
  const { data: actors, error } = await supabase
    .from('actors')
    .select('id,name,image')
    .returns<MyActor>()
  return actors
}

async function getMovies(userId:string|undefined){
  const supabase = createClient();
  const { data: movies, error } = userId ? (await supabase
      .from('movies')
      .select('id,name,image,director(name),favorites(id),year,time,imdb,categories_movies(category(title))')
      .filter('favorites.userId','eq',userId)
      .returns<MyMovie>()
      ) : (await supabase
      .from('movies')
      .select('id,name,image,director(name),year,time,imdb,categories_movies(category(title))')
      .returns<MyMovie>()
      )
  return movies
}

async function getNewMovies(userId:string|undefined){
  const supabase = createClient();
  const { data: newMovies, error } = userId ? (await supabase
    .from('movies')
    .select('id,name,image,director(name),favorites(id),year,time,imdb,create_at,categories_movies(category(title))')
    .filter('favorites.userId','eq',userId)
    .order('create_at', { ascending: false })
    .returns<MyMovie>()) : (await supabase
    .from('movies')
    .select('id,name,image,director(name),year,time,imdb,create_at,categories_movies(category(title))')
    .order('create_at', { ascending: false })
    .returns<MyMovie>())
  return newMovies
}

async function getPopularMovies(userId:string|undefined){
  const supabase = createClient();
  const { data: popularMovies, error } =  userId ? (await supabase
    .from('movies')
    .select('id,name,image,director(name),favorites(id),year,time,imdb,categories_movies(category(title))')
    .filter('favorites.userId','eq',userId)
    .order('imdb', { ascending: false })
    .returns<MyMovie>()) : (await supabase
    .from('movies')
    .select('id,name,image,director(name),year,time,imdb,categories_movies(category(title))')
    .order('imdb', { ascending: false })
    .returns<MyMovie>())
  return popularMovies
}

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()
  const actors=await getActors()
  const movies=await getMovies(data?.user?.id)
  const newMovies=await getNewMovies(data?.user?.id)
  const popularMovies=await getPopularMovies(data?.user?.id)
  return (
    <>
      <HeaderSlider userId={data?.user?.id} />
      <div className="flex flex-col justify-center items-center gap-y-2 md:gap-y-4 mt-16">
        <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
          Follow cinema news with
        </span>
        <span className="text-4xl md:text-6xl lg:text-8xl font-extrabold bg-gradient-to-br from-orange-600 from-30% via-amber-600 to-orange-700 bg-clip-text text-transparent">
          JUPITER
        </span>
      </div>
      <ContentSlider />
      <div className="p-4">
        <HomeMovies
          userId={data?.user?.id}
          titleName="Movies"
          data={movies}
          titleIcon={
            <RiMovie2Fill className="text-orange-600 text-3xl" />
          }
        />
        <HomeMovies
          userId={data?.user?.id}
          titleName="New Movies"
          data={newMovies}
          titleIcon={<MdLocalMovies className="text-orange-600 text-3xl" />}
        />
        <HomeMovies
          userId={data?.user?.id}
          titleName="The Best Of IMDB"
          data={popularMovies}
          titleIcon={<FaImdb className="text-orange-600 text-3xl" />}
        />
        <HomeActors row="grid-rows-1" more={true} actors={actors} />
        <HomeCategories />
      </div>

    </>
  );
}
