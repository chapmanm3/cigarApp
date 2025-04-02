import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export const useSupabaseImage = (imagePath: string | undefined): { imageUri: string | undefined } => {
  const [image, setImage] = useState<string>()

  if(!imagePath) {
    return {imageUri: undefined}
  }

  const loadImage = async (imagePath: string) => {
    supabase.storage
      .from('cigars')
      .download(imagePath)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      });
  }

  useEffect(() => {
    loadImage(imagePath)
  }, [imagePath])

  return { imageUri: image }

}
