import FilterMovies from "@/components/filterMovies";
import MoviesCart from "@/components/moviesCart";
import { createClient } from '@/utils/supabase/server'

type MyMovie={
  id:string;
  name:string;
  image:string;
  year:number;
  time:number;
  imdb:number;
  director:{name:string};
  favorites?:{id:string}[];
  create_at?:string;
  categories_movies?:{category:{title:string}}[]
}[]|null

async function getData(
  searchParams: {
    movieName?:string;
    director?:string;
    category?:string;
    year?:string;
    hour?:string;
    rates?:string;
  },id:string|undefined){
  const supabase = createClient();
  const { data: movies, error:err } = id ? (await supabase
    .from('movies')
    .select('id,name,image,director!inner(name),favorites(id),year,time,imdb,create_at,categories_movies!inner(category!inner(title))')
    .filter('director.name', 'ilike', `%${searchParams?.director || ""}%`)
    .filter('categories_movies.category.title','ilike',`%${searchParams?.category || ""}%`)
    .filter('favorites.userId','eq',id)
    .or(`and(name.ilike.%${searchParams?.movieName || ""}%,year.gte.${searchParams?.year?.slice(10) || 1000},time.gte.${searchParams?.hour?.slice(10,-1) || 0},imdb.gte.${searchParams?.rates?.slice(10) || 0})`)
    .order('create_at', { ascending: false })
    .returns<MyMovie>()) : (await supabase
    .from('movies')
    .select('id,name,image,director!inner(name),year,time,imdb,create_at,categories_movies(category(title))')
    .filter('director.name', 'ilike', `%${searchParams?.director || ""}%`)
    .or(`and(name.ilike.%${searchParams?.movieName || ""}%,year.gte.${searchParams?.year?.slice(10) || 1000},time.gte.${searchParams?.hour?.slice(10,-1) || 0},imdb.gte.${searchParams?.rates?.slice(10) || 0})`)
    .order('create_at', { ascending: false })
    .returns<MyMovie>())
  console.log(movies)
  return movies
}

export default async function Movies({
  searchParams,
}: {
  searchParams: {
    movieName?:string;
    director?:string;
    category?:string;
    year?:string;
    hour?:string;
    rates?:string;
  };
}) {

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()
  const movies=await getData(searchParams,data?.user?.id)
  return (
    <div className="w-full container p-4">
      <FilterMovies />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-8 p-4 bg-black/50 rounded-2xl">
        {movies?.map(movie => (
          <MoviesCart
            key={movie?.id}
            id={movie?.id}
            name={movie?.name}
            img={movie?.image}
            categories={movie?.categories_movies}
            rate={movie?.imdb}
            time={movie?.time}
            year={movie?.year}
            director={movie?.director?.name}
            favorites={movie?.favorites}
            pathName="/movies"
            userId={data?.user?.id}
            className="w-full h-52"
          />
        ))}
      </div>
    </div>
  );
}
