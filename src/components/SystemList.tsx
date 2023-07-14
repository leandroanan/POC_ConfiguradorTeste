import { useStore } from "../hooks/store.ts";

function SystemList() {
    const systems = useStore((state) => state.systems);

    return (
        <ul>
            {systems.map((system, index) => (
                <li key={index}>
                    <h2>{system.Id}</h2>
                    <p>{system.name}</p>
                    <p>{system.url}</p>
                    <p>{system.authType}</p>
                </li>
            ))}
        </ul>
    );
}
export default SystemList;