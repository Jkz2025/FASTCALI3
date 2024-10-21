import React from 'react'
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali'
import { useState } from 'react';


const BotonBuscar = () => {
 

  return (
    <div>
       <form className="flex flex-wrap gap-2 mt-6">
                                <div className="flex flex-col sm:flex-row items-center gap-14">
                                    <div className="flex flex-col">
                                        <label htmlFor="users" className="text-gray-200">Tipo Documento:</label>
                                        <select
                                            name="users"
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        >
                                            <option value="" disabled selected>Seleccione tipo Documento</option>
                                            <option value="Factura Electronica">Factura Electronica</option>
                                            <option value="Nota Credito">Nota Credito</option>
                                            <option value="Nota Debito">Nota Debito</option>
                                            <option value="Documento Soporte">Documento Soporte</option>
                                            <option value="Nomina Electronica">Nomina Electronica</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="users" className="text-gray-200">N* Documento:</label>
                                        <select
                                            name="users"
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        >
                                            <option value="">Selecciona un cliente</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="codigoCliente" className="text-gray-200">Código Cliente:</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                            name="codigoCliente"
                                        >
                                            <option value="">Selecciona un cliente</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-14">
                                    <div className="flex flex-col">
                                        <label htmlFor="codigoDepartamento" className="text-gray-200">Empleado:</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                            name="codigoDepartamento"
                                        >
                                            <option value="">Selecciona Empleado</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="codigoCiudad" className="text-gray-200">Código Bodega:</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                            name="codigoCiudad"
                                        >
                                            <option value="">Selecciona una Bodega</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="fechaInicio" className="text-gray-400">Fecha inicio:</label>
                                        <input type="date" id="fechaInicio" name="fechaInicio" className="px-4 py-2 rounded-lg bg-white border border-gray-300" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="fechaFin" className="text-gray-400">Fecha fin:</label>
                                        <input type="date" id="fechaFin" name="fechaFin" className="px-4 py-2 rounded-lg bg-white border border-gray-300" />
                                    </div>
                                </div>
                            </form>
    </div>
  )
}

export default BotonBuscar
