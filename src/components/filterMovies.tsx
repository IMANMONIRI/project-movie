"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from '@/utils/supabase/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useState,useEffect} from 'react'

type MyType={
  id:string;
  title:string;
}[]|null

export default function FilterMovies() {
  const searchParam = useSearchParams();
  const searchParams = new URLSearchParams(searchParam);

  const router = useRouter();

  const categoriesData = ["select", "comedy", "action", "drama"];
  const yearsData = ["select", "more_than_2000", "more_than_2010", "more_than_2020"];
  const hoursData = ["select", "more_than_60m", "more_than_90m", "more_than_120m"];
  const ratesData = ["select", "more_than_7", "more_than_8", "more_than_9", "topRate"];

  const [categories,setCategories]=useState<MyType>([{id:"1",title:"select"}])
  useEffect(()=>{
    async function getMovies(){
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('id,title')
      if (data){
        setCategories([{id:1,title:"select"},...data])
      }
    }
    getMovies()
  },[])

  return (
    <form className="w-full grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 xl:grid-cols-8 xl:grid-rows-1 gap-2 bg-slate-950/50 p-4 rounded-xl border-2 border-slate-950">
      <div className="flex flex-col space-y-1 col-span-2">
        <Label htmlFor="movieName">Movie Name</Label>
        <Input
          name="movieName"
          id="movieName"
          className="font-bold"
          type="text"
          placeholder="Movie Name"
          defaultValue={searchParams.get("movieName") || ""}
          onChange={e => {
            if (searchParams.has("movieName") && !e.target.value) {
              searchParams.delete("movieName");
            } else {
              searchParams.set("movieName", e.target.value);
            }
            router.replace(`?${searchParams.toString()}`);
          }}
        />
      </div>
      <div className="flex flex-col space-y-1 col-span-2">
        <Label htmlFor="director">Director</Label>
        <Input
          name="director"
          id="director"
          className="font-bold"
          type="text"
          placeholder="Director"
          defaultValue={searchParams.get("director") || ""}
          onChange={e => {
            if (searchParams.has("director") && !e.target.value) {
              searchParams.delete("director");
            } else {
              searchParams.set("director", e.target.value);
            }
            router.replace(`?${searchParams.toString()}`);
          }}
        />
      </div>
      <div className="flex flex-col space-y-1 col-span-1">
        <Label htmlFor="category">Category</Label>
        <Select
          defaultValue={searchParams.get("category") || "select"}
          onValueChange={e => {
            if (searchParams.has("category") && e === "select") {
              searchParams.delete("category");
            } else {
              searchParams.set("category", e);
            }
            router.replace(`?${searchParams.toString()}`);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map(category => (
              <SelectItem key={category?.id} value={category?.title}>
                {category?.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1 col-span-1">
        <Label htmlFor="year">Year</Label>
        <Select
          defaultValue={searchParams.get("year") || "select"}
          onValueChange={e => {
            if (searchParams.has("year") && e === "select") {
              searchParams.delete("year");
            } else {
              searchParams.set("year", e);
            }
            router.replace(`?${searchParams.toString()}`);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {yearsData.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1 col-span-1">
        <Label htmlFor="hour">Hour</Label>
        <Select
          defaultValue={searchParams.get("hour") || "select"}
          onValueChange={e => {
            if (searchParams.has("hour") && e === "select") {
              searchParams.delete("hour");
            } else {
              searchParams.set("hour", e);
            }
            router.replace(`?${searchParams.toString()}`);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {hoursData.map(hour => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1 col-span-1">
        <Label htmlFor="rate">Rate</Label>
        <Select
          defaultValue={searchParams.get("rates") || "select"}
          onValueChange={e => {
            if (searchParams.has("rates") && e === "select") {
              searchParams.delete("rates");
            } else {
              searchParams.set("rates", e);
            }
            router.replace(`?${searchParams.toString()}`);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {ratesData.map(rate => (
              <SelectItem key={rate} value={rate}>
                {rate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
