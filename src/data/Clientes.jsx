export async function getClients() {
  const response = await fetch(import.meta.env.VITE_API_URL);
  const result = await response.json();

  return result;
}

export async function getClient(id) {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const result = await response.json();
  
    return result;
  }

export async function agregarCliente(datos) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST', 
        body: JSON.stringify(datos),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    await response.json();
  } catch (error) {}
}


export async function actualizarCliente(id, datos){
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(datos),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    await response.json();
  } catch (error) {}
}


export async function eliminarCliente(id){
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: 'DELETE', 
        
    })
    await response.json();
  } catch (error) {}
}