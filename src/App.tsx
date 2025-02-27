import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import { useState } from "react";

function App() {
  interface Address {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: string;
  }

  const [address, setAddress] = useState<Address | null>(null);
  const [input, setInput] = useState<string>();

  const handleSearch = async () => {
    if (input === "") {
      alert("Preencha um cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setAddress(response.data);
    } catch (error) {
      alert("Erro ao buscar CEP, Inexistente");
      setAddress(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-blue-950 ">
      <div className="flex gap-4">
        <h1 className="text-6xl text-white">Buscador CEP</h1>
      </div>
      <div className="flex justify-around  items-center p-2  rounded-[8px] bg-[rgba(255,255,255,0.2)] mt-8 mb-8 ">
        <input
          className="bg-transparent border-0 text-[20px] text-white outline-0 mx-2"
          placeholder="Digite seu cep..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="cursor-pointer " onClick={() => handleSearch()}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {address && Object.keys(address).length > 0 && (
        <div className="bg-white py-4 px-8 rounded flex flex-col gap-4 text-center w-[500px]">
          <h1 className="text-5xl">CEP: {address.cep}</h1>
          <div>
            <h2 className="font-bold">{address.logradouro}</h2>
            <h2 className="font-bold">{address.complemento}</h2>
            <h2 className="font-bold">{address.bairro}</h2>
            <h2 className="font-bold">
              {address.localidade} - {address.uf}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
