import {useState} from "react";

export async function usePreloadImages(srcArr){

    const [isLoading, setIsLoading] = useState(true);

    const promises = await srcArr.map((src) =>{
       return new Promise((resolve, reject) => {
            const img = new Image();

            img.src = src;
            img.onload = resolve(img);
            img.onerror = reject(src);

      });
    });

    await Promise.all(promises);

    setIsLoading(false);

    return isLoading;


}