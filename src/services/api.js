
const API_BASE_URL = "http://localhost:3000/api";

export const getPokemons = async (page = 1, limit, search = "") => {
  try {
    console.log(`${API_BASE_URL}/pokemon?page=${page}&limit=${limit}&search=${search}`);
    const response = await fetch(
      `${API_BASE_URL}/pokemon?page=${page}&limit=${limit}&search=${search}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error en el servidor");
   return null;
  }
};

export const downloadPokemonPdf = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/pdf`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    
  } catch (error) {
    console.log("Error en el servidor");
  }
};

