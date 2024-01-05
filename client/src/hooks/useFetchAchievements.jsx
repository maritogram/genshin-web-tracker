import {useQuery} from "react-query";

export function useFetchAchievements(){
     const fetchAchievements = async () => {
        const res = await fetch('/api/achievements')
        if (!res.ok) {
            throw new Error('Network response was not ok.')
        }
        return res.json()
    }


    return useQuery('achievements', fetchAchievements)
}