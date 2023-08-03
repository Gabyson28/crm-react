import { getClient, actualizarCliente } from "../data/Clientes";
import Formulario from "../components/Formulario";
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await getClient(params.clienteId);


  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados",
    });
  }
  return cliente;
}

export async function action({request, params}){
    const formData = await request.formData();

    const data = Object.fromEntries(formData);
  
    const email = formData.get("email");
  
    const errores = [];
    if (Object.values(data).includes("")) {
      errores.push("Todos los campos son obligatorios");
    }
  
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
  
    if (!regex.test(email)) {
      errores.push("Email no es Válido");
    }
  
    if (Object.keys(errores).length) {
      return errores;
    }
  
    await actualizarCliente(params.clienteId, data);
  
    return redirect('/')
}

function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Modificar Cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((e, i) => <Error key={i}>{e}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />

          <input
            type="submit"
            value="Guardar"
            className="mt-5 w-full bg-blue-800 uppercase p-3 font-bold text-white text-lg"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
