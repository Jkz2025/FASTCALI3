import React, { useState } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import { fetchUsers } from "../Function/fetchUsers";
import { useFetchObligaciones } from "../Hooks/useFetchObligaciones";
import agregar from "../../assets/agregar.svg";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchCiudades } from "../Hooks/useFetchCiudad";
import { useFetchDepartamentos } from "../Hooks/useFetchDepartamentos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Dashboard/Components/Button";
import { useFetchListasPrecio } from "../Hooks/useFetchListasPrecio";

const CreateUser = () => {

  const [listas, setListasPrecios] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [ciudades, setCiudades] = useState([])
  const [obligaciones, setObligaciones] = useState([]);
  const [selectedObligaciones, setSelectedObligaciones] = useState([]); // Estado para almacenar las obligaciones tributarias seleccionadas
  useFetchObligaciones(setObligaciones);
  useFetchDepartamentos(setDepartamentos)
  useFetchCiudades(setCiudades)
  useFetchListasPrecio(setListasPrecios)
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    apellido: "",
    razon_social: "",
    age: "",
    ciudad: "",
    departamento: "",
    nit: "",
    direccion: "",
    email: "",
    telefono: "",
    tipo_cliente: "",
    listas_precios:"",
    cedula: "",
    obligacion_tributaria: "", // Se agregó el estado para almacenar la obligación tributaria seleccionada
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }



  async function createUser(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
   

    // Insertar usuario en la base de datos
    const { error } = await supabase.from("users").insert([
      {
        name: user.name,
        age: user.age,
        apellido: user.apellido,
        razon_social: user.razon_social,
        ciudad: user.ciudad,
        departamento: user.departamento,
        listas_precios: user.listas_precios,
        nit: user.nit,
        direccion: user.direccion,
        email: user.email,
        telefono: user.telefono,
        tipo_cliente: user.tipo_cliente,
        cedula: user.cedula,
        obligacion_tributaria: selectedObligaciones.toString() // Insertar las obligaciones tributarias seleccionadas
      },
     
    ]);
    if (error) {
      console.error("Error creating user:", error.message);
      setIsSubmitting(false);
      alert("Error creating user: " + error.message);
    } else {
      await fetchUsers();
      setIsSubmitting(false);
      setUser({
        name: "",
        apellido: "",
        razon_social: "",
        age: "",
        ciudad: "",
        departamento: "",
        nit: "",
        direccion: "",
        email: "",
        telefono: "",
        tipo_cliente: "",
        cedula: "",
        listas_precios: "",
        obligacion_tributaria: "", // Se limpia el estado de la obligación tributaria seleccionada
      });
      alert('Se crea el cliente satisfactoriamente')
      setSelectedObligaciones([]); // Limpiar las obligaciones tributarias seleccionadas después de crear el usuario
      navigate('/GestionPersonas/Clientes')
    }
  }

  const handleClickAgregarObligaciones = () => {
    if (user.obligacion_tributaria) {
      setSelectedObligaciones((prevSelected) => [
        ...prevSelected,
        user.obligacion_tributaria,
      ]); // Agregar la obligación tributaria seleccionada al estado
      setUser((prevFormData) => ({
        ...prevFormData,
        obligacion_tributaria: "", // Limpiar el estado de la obligación tributaria seleccionada después de agregarla
      }));
    }
  };

  const handleEliminarObligacion = (index) => {
    setSelectedObligaciones((prevSelected) =>
      prevSelected.filter((_, i) => i !== index)
    ); // Eliminar la obligación tributaria seleccionada del estado
  };

  return (
    <div className="max-w-4xl mx-auto my-8 mt-40">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Crear Cliente</h1>
        <form onSubmit={createUser} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-4">
              <label
                htmlFor="tipo_cliente"
                className="block text-gray-700 font-semibold mb-2"
              >
                Tipo Cliente
              </label>
              <select
                id="tipo_cliente"
                name="tipo_cliente"
                value={user.tipo_cliente}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 w-full sm:w-auto"
                required
              >
                <option value="Cliente" readonly>Seleccione un Tipo Cliente</option>
                <option value="Jurdica">Juridica</option>
                <option value="Natural">Natural</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="apellido"
                className="block text-gray-700 font-semibold mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-gray-700 font-semibold mb-2"
              >
                Edad
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={user.age}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="razon_social"
                className="block text-gray-700 font-semibold mb-2"
              >
                Razon Social
              </label>

              <input
                type="text"
                id="razon_social"
                name="razon_social"
                value={user.razon_social}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>


            <div className="mb-4">
              <label
                htmlFor="ciudad"
                className="block text-gray-700 font-semibold mb-2"
              >
                Ciudad
              </label>
              <select
                type="text"
                id="ciudad"
                name="ciudad"
                onChange={handleChange}

                className="p-2 rounded-lg bg-gray-800 text-gray-400 w-full sm:w-auto"
                required
              >
                <option value={user.ciudad} className="text-gray-800" >Seleccione una Ciudad</option>
                {ciudades.map((ciudad) => (
                  <option className="text-gray-500" value={ciudad.nombre_ciudad} key={ciudad.codigo_dane}>
                    {ciudad.nombre_ciudad} - {ciudad.codigo_dane}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="nit"
                className="block text-gray-700 font-semibold mb-2"
              >
                Nit
              </label>
              <input
                type="number"
                id="nit"
                name="nit"
                value={user.nit}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cedula"
                className="block text-gray-700 font-semibold mb-2"
              >
                Cedula
              </label>
              <input
                type="number"
                id="cedula"
                name="cedula"
                value={user.cedula}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="departamento"
                className="block text-gray-700 font-semibold mb-2"
              >
                Departamento
              </label>
              <select
                type="text"
                id="departamento"
                name="departamento"
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 w-full sm:w-auto"
                required
              >
                <option value={user.departamento} className="text-gray-800" >Seleccione un departamento</option>
                {departamentos.map((departamento) => (
                  <option className="text-gray-500" key={departamento.codigo_dane} value={departamento.nombre_departamento}  >
                    {departamento.nombre_departamento} - {departamento.codigo_dane}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="direccion"
                className="block text-gray-700 font-semibold mb-2"
              >
                Direccion
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={user.direccion}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="telefono"
                className="block text-gray-700 font-semibold mb-2"
              >
                Telefono
              </label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="listas_precios"
                className="block text-gray-700 font-semibold mb-2"
              >
                Lista Precio
              </label>
              <select
                type="text"
                id="listas_precios"
                name="listas_precios"
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 w-full sm:w-auto"
                required
              >
                <option value={user.listas_precios}
                >Seleccione una lista</option>
                {listas.map((lista) => (
                <option value={lista.name} key={lista.name}>{lista.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="obligacion_tributaria"
                className="block text-gray-700 font-semibold mb-2"
              >
                Obligaciones Tributarias
              </label>
              <select
                id="obligacion_tributaria"
                name="obligacion_tributaria"
                value={user.obligacion_tributaria}
                onChange={handleChange}
                className="p-1 rounded-lg bg-gray-800 text-gray-400 w-24 sm:w-32"
              >
                <option value="obligaciones" className="text-gray-800" readonly >Obligaciones</option>
                {obligaciones.map((obli) => (
                  <option
                    key={obli.codigo_obligacion}
                    value={obli.codigo_obligacion}
                  >
                    {obli.nombre} - {obli.codigo_obligacion}
                  </option>
                ))}
              </select>
              <img
                className="h-[40px] cursor-pointer"
                onClick={handleClickAgregarObligaciones}
                src={agregar}
                alt=""
              />
            </div>
            {/* Mostrar las obligaciones tributarias seleccionadas */}
            {selectedObligaciones.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Obligaciones Tributarias Seleccionadas:
                </label>
                <ul className="list-disc ml-8 text-">
                  {selectedObligaciones.map((obligacion, index) => (
                    <li key={index} className="text-gray-400" >
                      {obligacion}
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => handleEliminarObligacion(index)}
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Botón para crear el usuario */}
            <ButtonFastCali text={`Crear usuario`} />
          </div>
        </form>

      </div>
      <Link to='/GestionPersonas/Clientes'> <div className='py-4 flex justify-center'>
        <Button text='🔙' />
      </div>
      </Link>
    </div>

  );
};

export default CreateUser;
