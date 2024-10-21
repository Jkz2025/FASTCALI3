import React from 'react'
import { useState } from 'react';
import { useFetchListasPrecio } from '../Hooks/useFetchListasPrecio'


const ListasPrecio = () => {
    const [listasPrecio, setListasPrecio] = useState([]);

    useFetchListasPrecio(setListasPrecio)

    return (
        <div>
            <div className="max-w-4xl mx-auto my-8 " >
                <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6 ">
                    <h1 className="text-2xl font-bold text-white mb-4">Listas De Precio</h1>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                            <thead>
                                <tr >
                                    <th className="border px-4 py-2 bg-gray-800">Nombre Lista</th>
                                    <th className="border px-4 py-2 bg-gray-800">Descripcion</th>
                                    <th className="border px-4 py-2 bg-gray-800">Moneda</th>
                                    <th className="border px-4 py-2 bg-gray-800">Categoria</th>
                                    <th className="border px-4 py-2 bg-gray-800">Descuento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listasPrecio.map((lista, index) => (
                                    <tr key={lista.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                                        <td className="border px-4 py-2">{lista.name}</td>
                                        <td className="border px-4 py-2">{lista.descripcion}</td>
                                        <td className="border px-4 py-2">{lista.moneda}</td>
                                        <td className="border px-4 py-2">{lista.categoria}</td>
                                        <td className="border px-4 py-2">{lista.descuento} %</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
                <div className="max-w-4xl mx-auto my-8 " >


                </div>
            </div>


        </div>

    )
}

export default ListasPrecio
