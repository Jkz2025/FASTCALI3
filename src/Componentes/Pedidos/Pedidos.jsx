import { useState } from 'react';
import { useFetchPedidos } from '../Hooks/useFetchPedidos';
import { useNavigate } from 'react-router-dom';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  useFetchPedidos(setPedidos);
  const [showModal, setShowModal] = useState(false);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);

  const toggleModal = (pedido) => {
    setPedidoDetalle(pedido);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPedidoDetalle(null); // Limpiar los detalles del pedido cuando se cierra el modal
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Pedidos</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-800">Codigo Pedido</th>
                <th className="border px-4 py-2 bg-gray-800">Nombre</th>
                <th className="border px-4 py-2 bg-gray-800">Bodega</th>
                <th className="border px-4 py-2 bg-gray-800">Producto</th>
                <th className="border px-4 py-2 bg-gray-800">Cantidad</th>
                <th className="border px-4 py-2 bg-gray-800">Iva</th>
                <th className="border px-4 py-2 bg-gray-800">Total</th>
                <th className="border px-4 py-2 bg-gray-800">Fecha creacion</th>
                <th className="border px-4 py-2 bg-gray-800">Estado</th>
                <th className="border px-4 py-2 bg-gray-800">Detalles</th>
                <th className="border px-4 py-2 bg-gray-800">Editar</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={pedido.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                  <td className="border px-4 py-2">{pedido.codigo_pedido}</td>
                  <td className="border px-4 py-2">{pedido.user_id} - {pedido.user_name}</td>
                  <td className="border px-4 py-2">{pedido.bodega_id}</td>
                  <td className="border px-4 py-2">{pedido.material_id}</td>
                  <td className="border px-4 py-2">{pedido.cantidad}</td>
                  <td className="border px-4 py-2">{pedido.iva}</td>
                  <td className="border px-4 py-2">{pedido.valor_total}</td>
                  <td className="border px-4 py-2">{pedido.fecha_creacion}</td>
                  <td className="border px-4 py-2">{pedido.estado}</td>
                  <td className="border px-4 py-2 cursor-pointer">
                  <button
                      className="underline text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => toggleModal(pedido)}
                    > Ver detalles
                    </button></td>
                    <td className="border px-4 py-2 cursor-pointer">
                  <button
                      className="underline text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => navigate(`/FacturacionyPedidos/Pedidos/Editar/${pedido.codigo_pedido}`)}
                    > Editar
                    </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* Modal para mostrar detalles del pedido */}
        {showModal && pedidoDetalle && (
       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75">
       <div className="relative w-auto max-w-3xl mx-auto my-6 bg-white rounded-lg shadow-lg">
         <div className="relative flex flex-col w-full border-0 rounded-lg outline-none focus:outline-none">
           <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
             <h3 className="text-lg font-semibold">Detalles del Pedido</h3>
             <button
               className=""
               onClick={closeModal}
             >
               <span className="text-black h-6 w-6 text-2xl block">❌</span>
             </button>
           </div>
           <div className="relative p-6 flex-auto">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campo</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 <tr>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ID</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.id}</td>
                 </tr>
                 <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Usuario</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.user_id} - {pedidoDetalle.user_name}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bodega</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.bodega_id}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Material</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.material_id}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cantidad</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.cantidad}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">IVA</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.iva}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Valor Total</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.valor_total}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fecha Creación</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.fecha_creacion}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Estado</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.estado}</td>
                    </tr>
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
     
        )}
      </div>
    </div>
  );
}

export default Pedidos;
