import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link"

export default async function HomeActors({
  actors,
  row,
  more
}: {
  actors:{id:string;name:string;image:string}[] | null
  row: string;
  more: boolean;
}) {
  return (
    <div className="w-full container mb-8 p-2 bg-black/50 rounded-2xl">
      <div className="mb-2 flex justify-between items-center px-2 pt-2">
        <div className="flex justify-start items-center space-x-1">
          <FaUsers className="text-orange-600 text-3xl" />
          <p className="text-white text-2xl font-extrabold">Actors</p>
        </div>
        {more && (
          <div className="flex justify-start items-center group">
            <p className="text-white text-xl font-extrabold">more</p>
            <MdKeyboardArrowRight className="text-white transition-all duration-300 group-hover:text-orange-600 text-3xl -mb-1" />
          </div>
        )}
      </div>
      <div
        className={`w-full grid grid-flow-col gap-3 p-2 overflow-x-auto ${row}`}
      >
        {actors?.map(actor => (
          <div
            className="relative w-36 h-36 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 group border border-gray-500 hover:border-white p-0.5"
            key={actor?.id}
          >
            <Image
              className="w-full h-full object-cover rounded-full"
              width={1000}
              height={1000}
              alt="img"
              src={actor?.image}
            />
            <Link href={`/actors/${actor?.id}`} className="absolute flex justify-center items-center w-full h-full top-0 left-0 bg-transparent transition-all duration-300 group-hover:bg-black/30 z-20">
              <p className="text-center text-transparent text-xl font-extrabold transition-all duration-300 group-hover:text-orange-500">
                {actor?.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
