import { FaHeart } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { Button } from "./ui/button";

export default function AddFavoriteButton(){
	return(
		<Button size="sm" variant="outline" className="bg-gray-500/50" type="submit">
		  <FaHeart className="text-white" />
		</Button>	
	)
}