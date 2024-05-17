import ContentSlider from "@/components/contentSlider";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function AboutUs(){
	return(
		<>
			<div className="w-full h-[90vh] flex justify-center items-center overflow-hidden">
		        <ContentSlider />
		    </div>
		    <div className="absolute container top-[10vh] left-0 w-full h-[90vh] flex justify-center items-center">
		    	<div className="bg-slate-950 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border-2 border-gray-800 p-8 rounded-2xl flex flex-col justify-center items-start gap-y-4">
		    		<div className="flex justify-center items-center gap-2">
		    			<MdEmail className="text-orange-500 text-2xl" />
		    			<a href="mailto:imanmoniri003@gmail.com" className="text-2xl font-extrabold hover:text-orange-600 transition-all duration-300">imanmoniri003@gmail.com</a>
		    		</div>
		    		<div className="flex justify-center items-center gap-2">
		    			<FaGithub className="text-orange-500 text-2xl" />
		    			<a href="https://github.com/IMANMONIRI" className="text-2xl font-extrabold hover:text-orange-600 transition-all duration-300">https://github.com/IMANMONIRI</a>
		    		</div>
		    	</div>
		    </div>
		</>
	)
}