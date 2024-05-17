"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { createClient } from '@/utils/supabase/client'
import {useState,useEffect} from 'react'

async function getMovies(){
  const supabase = createClient();
  const { data: Movies, error } = await supabase
    .from('movies')
    .select('id,image')
    .order('create_at', { ascending: false })
  return Movies
}

type MyType={
  id:string;
  image:string;
}[]|null

export default function ContentSlider() {
  const [movies,setMovies]=useState<MyType>([])
  useEffect(()=>{
    async function getMovies(){
      const supabase = createClient();
      const { data: Movies, error } = await supabase
        .from('movies')
        .select('id,image')
        .order('create_at', { ascending: false })
      setMovies(Movies)
    }
    getMovies()
  },[])

  return (
    <div className="h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] w-full flex justify-end items-center overflow-hidden -mt-16">
      <div className="w-full -rotate-[8deg] relative p-1">
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-[#012] via-transparent to-[#012] z-40" />
        <Marquee className="mb-4" autoFill={true}>
          {movies?.map(movie => (
            <div key={movie?.id} className="w-52 h-36 md:w-64 md:h-44 lg:w-72 lg:h-52 xl:w-80 xl:h-64 2xl:w-96 2xl:h-64 overflow-hidden rounded-2xl mr-4">
              <Image
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
                alt="img"
                src={movie?.image}
              />
            </div>
          ))}
        </Marquee>
        <Marquee direction="right" autoFill={true}>
          {movies?.map(movie => (
            <div key={movie?.id} className="w-52 h-36 md:w-64 md:h-44 lg:w-72 lg:h-52 xl:w-80 xl:h-64 2xl:w-96 2xl:h-64 overflow-hidden rounded-2xl mr-4">
              <Image
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
                alt="img"
                src={movie?.image}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
