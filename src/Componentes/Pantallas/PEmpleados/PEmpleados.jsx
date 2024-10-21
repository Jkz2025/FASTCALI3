import React from 'react'
import Empleados from '../../Empleados/Empleados'
import EmpleadosSearchForm from '../../Empleados/EmpleadosSearchForm.jsx'

const PEmpleados = () => {
  return (
    <div className='mt-40'> 
      <EmpleadosSearchForm />
      <Empleados />
    </div>
  )
}

export default PEmpleados
