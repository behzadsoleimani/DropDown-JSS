import { useState } from "react";
import { IItem } from "../components/dropdown/types";



export function useListItems(initialState: IItem[]) {
    const [items, setItems] = useState<IItem[]>(initialState);
    const [error, setError] = useState<boolean>(false);

    const addItems = (item: IItem) => {
        setError(false);
        if(items.filter((i: IItem) => i.title === item.title).length){
            setError(true);
        } else{
            setItems([...items , item]);
        }
    }


    return { items, addItems , error }
}

