import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali"
import styles from "../../style"
import { useState } from "react"


const EnvioDian = () => {

const [ showFilterForm, setShowFilterForm ] = useState(null)
const [ showSearchButton, setShowSearchButton ] = useState(true)

const handleSearchClick = () => {
  setShowFilterForm(true)
  setShowSearchButton(false)
}

const handleCancelClick = () => {
    setShowFilterForm(false)
    setShowSearchButton(true)
}


  return (
    <>
    <div className="max-w-4xl mx-auto my-8">
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
            <h1 className="text-white">Envio facturacion Dian</h1>
        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
          {showSearchButton &&   <ButtonFastCali onClick={handleSearchClick} text={`Buscar`} /> }

            {showFilterForm && (

<form className="flex flex-wrap gap-2">
<div className="flex flex-col sm:flex-row items-center gap-14">

<div className="flex flex-col">

        <label htmlFor="users" className="text-gray-200">Tipo Documento:</label>
        <select
            name="users"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
            <option value="" placeholder="">Factura Electronica</option>
            <option value="" placeholder="">Nota Credito</option>
            <option value="" placeholder="">Nota Debito</option>
            <option value="" placeholder="">Documento Soporte</option>
            <option value="" placeholder="">Nomina Electronica</option>
        </select>
    </div>
    <div className="flex flex-col">

        <label htmlFor="users" className="text-gray-200">N* Documento:</label>
        <select
            name="users"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
            <option value="" placeholder="Selecciona un cliente">Selecciona un cliente</option>
        </select>
    </div>
    <div className="flex flex-col">
        <label htmlFor="codigoCliente" className="text-gray-200">Código Cliente:</label>
        <select
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

            name="codigoCliente"
        // value={`searchParams.codigoPedido`}
        // onChange={`handleInputChange`}
        >
            <option value="" >Selecciona un cliente</option>
        </select>
    </div>
  <div className="flex flex-col">

  </div>

</div>

<div className="flex flex-col sm:flex-row items-center gap-14"> 
    
    <div className="flex flex-col">
        <label htmlFor="codigoDepartamento" className="text-gray-200">Empleado:</label>
        <select
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            name="codigoDepartamento"
        // value={`searchParams.codigoPedido`}
        // onChange={`handleInputChange`}
        >
            <option value="" >Selecciona Empleado</option>
          
        </select>
    </div>
    <div className="flex flex-col">
        <label htmlFor="codigoCiudad" className="text-gray-200">Código Bodega:</label>
        <select
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            name="codigoDepartamento"
        // value={`searchParams.codigoPedido`}
        // onChange={`handleInputChange`}
        >
            <option value="" >Selecciona una Bodega</option>
        </select>
    </div>
    <div className="flex flex-col">
          {/* Inputs de rango de fechas */}
          <div className="flex flex-col">
                                <label htmlFor="fechaInicio" className="text-gray-400">Fecha inicio:</label>
                                <input type="date" id="fechaInicio" name="fechaInicio" placeholder="Fecha inicio" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={`searchParams.fechaInicio`} onChange={`handleInputChange`} />
                            </div>
    </div>

                            <div className="flex flex-col">
                                <label htmlFor="fechaFin" className="text-gray-400">Fecha fin:</label>
                                <input type="date" id="fechaFin" name="fechaFin" placeholder="Fecha fin" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={`searchParams.fechaFin`} onChange={`handleInputChange`} />
                            </div>
</div>
<ButtonFastCali text={`Cancelar`} onClick={handleCancelClick}/>

</form>
                        // <form className="flex flex-wrap gap-2">
                        //     <div className="flex flex-col sm:flex-row items-center gap-14">

                        //         <div className="flex flex-col">

                        //             <label htmlFor="users" className="text-gray-200">Nombre Cliente:</label>
                        //             <select
                        //                 name="users"
                        //                 className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        //             // value={searchParams.user_name}
                        //             // onChange={`handleInputChange`}
                        //             >
                        //                 <option value=""disabled selected>Seleccione tipo documento</option>
                        //                 <option value="">Factura Electronica </option>
                        //                 <option value="">Nota Credito</option>
                        //                 <option value="">Nota Debito</option>
                        //                 <option value="">Documento Soporte</option>
                        //             </select>
                        //         </div>
                        //         <div className="flex flex-col">
                        //             <label htmlFor="codigoCliente" className="text-gray-200">Código Factura:</label>
                                   
                                   
                        //             <select
                        //                 className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        //                 name="codigo_factura"
                        //             >
                        //                 <option value="" disabled selected>Seleccione Factura </option>
                        //             </select>
                        //         </div>
                        //         <div className="flex flex-col">
                        //         <label htmlFor="fechaInicio" className="text-gray-400">Fecha inicio:</label>
                        //         <input type="date" id="fechaInicio" name="fechaInicio" placeholder="Fecha inicio" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" 
                        //         value={`searchParams.fechaInicio`} onChange={`handleInputChange`} />
                        //     </div>
                        //     <div className="flex flex-col">
                        //         <label htmlFor="fechaFin" className="text-gray-400">Fecha fin:</label>
                        //         <input type="date" id="fechaFin" name="fechaFin" placeholder="Fecha fin" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" 
                        //         value={`searchParams.fechaFin`} onChange={`handleInputChange`} />
                        //     </div>
                        //         <div className="flex flex-col">

                        //             <select
                        //                 className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        //                 name="cliente"
                        //             >
                        //                 <option value="" disabled selected>Seleccione Cliente </option>
                        //             </select>
                        //     </div>
                        //     <div className="flex flex-col">

                        //             <select
                        //                 className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        //                 name="empleado"
                        //             >
                        //                 <option value="" disabled selected>Seleccione Empleado </option>
                        //             </select>
                        //     </div>
                        //     </div>
                           
                            
                        // </form>
                    )}
          </div>
          <div className="overflow-x-auto mt-10">
          <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                    table
          </table>

          </div>
          </div>
          </div>
          </>
  )
}

export default EnvioDian
