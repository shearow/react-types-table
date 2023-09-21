import { useEffect, useMemo, useRef, useState } from "react";
import { Welcome, PersonsList } from "../types/homePage";

const URL_BASE_RANDOM_USER = 'https://randomuser.me/api';

export const usePersonsList = () => {
    const [personsList, setPersonsList] = useState<PersonsList[]>([]);
    const [colorFiles, setColorFiles] = useState<boolean>(false);
    const [orderCountry, setOrderCountry] = useState<boolean>(false);
    const [filterByCountry, setFilterByCountry] = useState<string>("");
    const initialTable = useRef<PersonsList[]>([]);

    useEffect(() => {
        takePersons();
    }, []);
    
    const takePersons = async () => {
        try{
            const res = await fetch(`${URL_BASE_RANDOM_USER}/?results=100`);
            const data: Welcome = await res.json();

            if(!res.ok) throw new Error("An error has ocurred.");

            const modificatedData = data.results.map( person => {
                return {
                    picture: person?.picture?.medium || person?.picture?.large || person?.picture?.thumbnail,
                    name: person?.name?.first + person?.name?.last || "Unknow",
                    country: person?.location?.country || "Unknow",
                    id: person?.login.uuid
                }
            });
            initialTable.current = modificatedData;
            setPersonsList(modificatedData);
        }catch(err){
            console.log(err);
        }
    }

    const deleteToList = (personId: string) => {
        setPersonsList(prevState => prevState.filter(item => item.id !== personId));
    }

    const changeColorTable = () => setColorFiles(prevState => !prevState);

    const changeFilterCountry = (e: React.ChangeEvent<HTMLInputElement>)=> setFilterByCountry(e.target.value);

    const sortCountry = () => setOrderCountry(prevState => !prevState);

    const changeToInitialTable = () => setPersonsList(initialTable.current);

    const filterInputCountry = useMemo( () => {
        return personsList.filter(person => person.country.toLowerCase().match(filterByCountry.toLowerCase()));
    }, [personsList, filterByCountry]);

    const ordenatePersonsCountry = useMemo(() => {
        return (
            orderCountry
                ? [...filterInputCountry].sort( (a, b) => (
                    a.country.localeCompare(b.country)
                ))
                : filterInputCountry
        )
    }, [filterInputCountry, orderCountry])

    return {
        changeFilterCountry,
        changeColorTable,
        sortCountry,
        changeToInitialTable,
        colorFiles,
        ordenatePersonsCountry,
        deleteToList
    }
}