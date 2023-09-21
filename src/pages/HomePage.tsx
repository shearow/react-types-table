import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/homePage.css";
import { Welcome, PersonsList } from "../types/homePage";

const URL_BASE_RANDOM_USER = 'https://randomuser.me/api';

export const HomePage = () => {
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
            const res = await fetch(`${URL_BASE_RANDOM_USER}/?results=5`);
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

    const sortCountry = () => setOrderCountry(prevState => !prevState);

    const changeToInitialTable = () => setPersonsList(initialTable.current);

    const filterInputCountry = useMemo( () => {
        console.log("funca")
        return personsList.filter(person => person.country.toLowerCase().match(filterByCountry.toLowerCase()));
    }, [personsList, filterByCountry]);

    const ordenatePersonsCountry = useMemo(() => {
        console.log("funca 2");
        return (
            orderCountry
                ? [...filterInputCountry].sort( (a, b) => (
                    a.country.localeCompare(b.country)
                ))
                : filterInputCountry
        )
    }, [filterInputCountry, orderCountry])

    return (
        <div className="list-users">
            <h2 className="list-users-title">List Users</h2>
            <div className="list-users-options">
                <button onClick={changeColorTable}>Color Files</button>
                <button onClick={sortCountry}>Ord by country</button>
                <button onClick={changeToInitialTable}>Restored initial Table</button>
                <input 
                    onChange={(e) => setFilterByCountry(e.target.value)} 
                    type="text" 
                    placeholder="filter to country"
                />
            </div>

            <div className="list-users-table">
                <table>
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={colorFiles ? "activeColor" : ""}>
                        {ordenatePersonsCountry.map(person => (
                            <tr key={person.id}>
                                <td><img src={person.picture} alt={`Picture to ${person.name}`} /></td>
                                <td>{person.name}</td>
                                <td>{person.country}</td>
                                <td><button onClick={() => deleteToList(person.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}