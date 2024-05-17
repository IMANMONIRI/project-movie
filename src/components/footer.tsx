import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function Footer(){
	return(
		<div className="w-full flex justify-between items-center gap-4 container bg-black/50 py-8 px-32 border-t border-orange-600/50" >
			<Link
		        className="text-3xl bg-gradient-to-br from-orange-600 from-30% via-amber-600 to-orange-700 bg-clip-text text-transparent font-extrabold"
		        href="/"
		    >
		        JUPITER
		    </Link>
		    <div className="flex flex-col justify-center items-start">
		    	<Link href="/" className="text-lg font-extrabold">Home</Link>
		    	<Link href="/movies" className="text-lg font-extrabold">Movies</Link>
		    	<Link href="/about-us" className="text-lg font-extrabold">About Us</Link>
		    </div>
		    <div className="flex flex-col justify-center items-start">
		    	<div className="flex justify-center items-center gap-2">
		    		<MdEmail className="text-orange-500 text-lg" />
		    		<a href="mailto:imanmoniri003@gmail.com" className="text-lg font-extrabold hover:text-orange-600 transition-all duration-300">imanmoniri003@gmail.com</a>
		    	</div>
		    	<div className="flex justify-center items-center gap-2">
		    		<FaGithub className="text-orange-500 text-lg" />
		    		<a href="https://github.com/IMANMONIRI" className="text-lg font-extrabold hover:text-orange-600 transition-all duration-300">https://github.com/IMANMONIRI</a>
		    	</div>
		    </div>
		</div>
	)
}