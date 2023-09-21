import { TableListPersons } from "../components/TableListPersons";
import { usePersonsList } from "../hooks/usePersonsList";
import "../styles/homePage.css";

export const HomePage = () => {
    const {changeFilterCountry, changeColorTable, sortCountry, changeToInitialTable, colorFiles, ordenatePersonsCountry, deleteToList} = usePersonsList();

    return (
        <div className="list-users">
            <h2 className="list-users-title">List Users</h2>
            <div className="list-users-options">
                <button onClick={changeColorTable}>Color Files</button>
                <button onClick={sortCountry}>Ord by country</button>
                <button onClick={changeToInitialTable}>Restored initial Table</button>
                <input 
                    onChange={changeFilterCountry}
                    type="text" 
                    placeholder="filter to country"
                />
            </div>

            <div className="list-users-table">
                <TableListPersons 
                    listPersons={ordenatePersonsCountry} 
                    colorFiles={colorFiles} 
                    deleteToList={deleteToList}
                />
            </div>
        </div>
    )
}