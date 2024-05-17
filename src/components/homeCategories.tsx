import Image from "next/image";
import { BiSolidCategory } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { createClient } from '@/utils/supabase/server'

async function getData(){
  const supabase = createClient();  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
  return data
}

export default async function HomeCategories() {
  const categories=await getData()
  return (
    <div className="w-full container mb-8 p-2 bg-black/50 rounded-2xl">
      <div className="mb-2 flex justify-between items-center px-2 pt-2">
        <div className="flex justify-start items-center space-x-1">
          <BiSolidCategory className="text-orange-600 text-3xl" />
          <p className="text-white text-2xl font-extrabold">Categories</p>
        </div>
        <div className="flex justify-start items-center group">
          <p className="text-white text-2xl font-extrabold">more</p>
          <MdKeyboardArrowRight className="text-white transition-all duration-300 group-hover:text-orange-600 text-3xl -mb-1" />
        </div>
      </div>
      <div className="w-full grid grid-flow-col grid-rows-1 gap-3 p-2 overflow-x-auto">
        {categories?.map((category) => (
          <div
            className="relative w-36 h-36 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 group border border-gray-500 hover:border-white p-0.5"
            key={category?.id}
          >
            <Image
              className="w-full h-full object-cover rounded-full"
              width={1000}
              height={1000}
              alt="img"
              src={category?.img}
            />
            <div className="absolute w-full h-full top-0 left-0 bg-black/50 z-20 flex justify-center items-center">
              <p className="text-white text-xl font-extrabold transition-all duration-300 group-hover:text-orange-500">
                {category?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
