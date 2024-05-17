"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { FaHeart, FaImdb } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link"
import { createClient } from '@/utils/supabase/client'
import {useState,useEffect} from 'react'
import AddFavoriteButton from "@/components/addFavoriteButton"
import DeleteFavoriteButton from "@/components/deleteFavoriteButton"
import {AddFavoriteAction,DeleteFavoriteAction} from "@/action"

type MyType={
  id:string;
  name:string;
  image:string;
  year:number;
  time:number;
  imdb:number;
  director:{name:string};
  favorites:{id:string}[]
  create_at:string;
  categories_movies?:{category:{title:string}}[]
}[]|null

export default function HeaderSlider({userId}:{userId:string|undefined}) {
  const [movies,setMovies]=useState<MyType>([])
  useEffect(()=>{
    async function getMovies(){
      const supabase = createClient();
      const { data: Movies, error } = userId ? (await supabase
        .from('movies')
        .select('id,name,image,director(name),favorites(id),year,time,imdb,create_at,categories_movies(category(title))')
        .filter('favorites.userId','eq',userId)
        .order('create_at', { ascending: false })
        .returns<MyType>()) : (await supabase
        .from('movies')
        .select('id,name,image,director(name),favorites(id),year,time,imdb,create_at,categories_movies(category(title))')
        .order('create_at', { ascending: false })
        .returns<MyType>())
      setMovies(Movies)
    }
    getMovies()
  },[])

  return (
    <div className="w-full h-[90vh]">
      <Swiper
        effect={"fade"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2,
          disableOnInteraction: false
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper w-full h-full"
      >
        {movies?.map(movie => (
          <SwiperSlide key={movie?.id} className="w-full h-full">
            <Image
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
              alt="img"
              src={movie?.image}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#012] via-[#0129] to-[#012] flex justify-center items-center">
              <div className="flex justify-center items-center gap-x-4 md:gap-x-16">
                <div className="relative w-[150px] h-[250px] md:w-[300px] md:h-[500px] overflow-hidden rounded-2xl border border-gray-500 p-0.5">
                  <Image
                    className="w-full h-full object-cover rounded-xl"
                    width={1000}
                    height={1000}
                    alt="img"
                    src={movie?.image}
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-y-1">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold">{movie?.name}</p>
                  <div className="flex justify-start items-center">
                    <FaImdb className="text-orange-600" />
                    <span className="text-xs md:text-base font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">{movie?.imdb}</span>
                    <BsCalendarDateFill className="text-orange-600" />
                    <span className="text-xs md:text-base font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">{movie?.year}</span>
                    <MdAccessTimeFilled className="text-orange-600" />
                    <span className="text-xs md:text-base font-bold ml-0.5 md:ml-1 mr-2 md:mr-4">
                      {Math.floor(movie?.time/60)}h {movie?.time%60}m
                    </span>
                  </div>
                  <p className="text-sm md:text-base font-extrabold">{movie?.categories_movies?.map(category=>category?.category?.title).join(" , ")}</p>
                  <p className="text-sm md:text-base font-extrabold">Director: {movie?.director?.name}</p>
                  <div className="flex justify-center items-center gap-x-4">
                    <Button className="bg-gradient-to-br font-extrabold from-orange-600 from-30% via-amber-600 to-orange-700  text-white hover:from-orange-800 hover:via-amber-700 hover:to-orange-800" asChild>
                      <Link href={`/movies/${movie?.id}`}>watch</Link>
                    </Button>
                    {userId && movie?.favorites?.length===0 && (
                      <form action={AddFavoriteAction}>
                        <input type="hidden" name="userId" value={userId} />
                        <input type="hidden" name="movieId" value={movie?.id} />
                        <input type="hidden" name="pathName" value="/" />
                        <AddFavoriteButton />
                      </form>
                    )}
                    {userId && movie?.favorites?.length!==0 && (
                      <form action={DeleteFavoriteAction}>
                        <input type="hidden" name="favoriteId" value={movie?.favorites[0].id!} />
                        <input type="hidden" name="pathName" value="/" />
                        <DeleteFavoriteButton />
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
