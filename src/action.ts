"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache"

export async function AddFavoriteAction(formData: FormData){
	const supabase = createClient();
    const userId= formData.get("userId") as string
    const movieId= formData.get("movieId") as string
    const pathName=formData.get("pathName") as string;

	const { data, error } = await supabase
	  .from('favorites')
	  .insert([
	    { userId, movieId },
	  ])
	  .select()

	if (!error) {
      revalidatePath(pathName)
	}
}

export async function DeleteFavoriteAction(formData: FormData){
	const supabase = createClient();
    const favoriteId= formData.get("favoriteId") as string
    const pathName=formData.get("pathName") as string;

	const { error } = await supabase
	  .from('favorites')
	  .delete()
	  .eq('id', favoriteId)

	if (!error) {
      revalidatePath(pathName)
	}
}

export async function Change(formData:FormData){
	const supabase = createClient();
	const imageFile = formData.get("image") as File;
    const name = formData.get("name") as string;
    const userId = formData.get("userId") as string;
    console.log("imageFile",imageFile)
    const { data: imageData, error: err } = await supabase.storage
    .from("users")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png"
    });
    console.log("imageData",imageData)
    console.log("err",err)
    const { data, error } = await supabase
    .from("users")
    .update({
      name,
      img: imageData?.path,
    })
    .eq("id", userId)
    .select();
}