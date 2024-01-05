import {useQuery} from "react-query";

 export function useFetchCategories() {

    const fetchCategories = async () => {
        const res = await fetch('/api/catalog');
        if (!res.ok){
            throw new Error('Network response was not ok.');
        }

        return res.json();
    }


   return useQuery({queryKey: ["categories"], queryFn: fetchCategories})

}

