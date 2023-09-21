import { PersonsList } from "../types/homePage";

interface TableListPer {
    listPersons: PersonsList[],
    colorFiles: boolean,
    deleteToList: (id: string) => void
}

export const TableListPersons = ( {listPersons, colorFiles, deleteToList}: TableListPer ): JSX.Element => {
    return (
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
                {listPersons.map(person => (
                    <tr key={person.id} className="list-person-data">
                        <td><img src={person.picture} alt={`Picture to ${person.name}`} /></td>
                        <td>{person.name}</td>
                        <td>{person.country}</td>
                        <td><button onClick={() => deleteToList(person.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}