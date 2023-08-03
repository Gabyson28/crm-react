import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { getClients } from "../data/Clientes";

export function loader() {
  const clientes = getClients();

  return clientes;
}

function Index() {
  const clientes = useLoaderData();

  return (
    <>
     

      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">Aún no hay Clientes</p>
      )}
    </>
  );
}

export default Index;
