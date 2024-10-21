import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchPedidos } from '../Hooks/useFetchPedidos';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../CreateClient';
import styles from '../../style';
import { useFetchUsers } from '../Hooks/useFetchUsers';
import { useFetchBodegas } from '../Hooks/useFetchBodegas';
import { useFetchEmpresas } from '../Hooks/useFetchEmpresa';
import { useFetchHistorialP } from '../Hooks/useFetchHistorialP';

const Facturacion = () => {

  const [pedidos, setPedidos] = useState([]);
  const [pedidoDescripcion, setPedidoDescripcion] = useState([]);
  const [pedidosSeleccionados, setPedidosSeleccionados] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [empresa, setEmpresa] = useState([]);
  const [users, setUsers] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [bodegasSeleccionadas, setBodegasSeleccionadas] = useState([]);
  const [usuariosFinal, setUsuariosFinal] = useState([])
  const [bodegaFinal, setBodegasFinal] = useState([])
  useFetchEmpresas(setEmpresa);
  useFetchUsers(setUsers);
  useFetchBodegas(setBodegas);
  useFetchPedidos(setPedidos);
  useFetchHistorialP(setPedidoDescripcion)


  useEffect(() => {
    if (pedidos.length > 0) {
      setCargandoPedidos(false);
    }
  }, [pedidos]);

  const toggleModal = (pedido) => {
    const userDetail = users.find(user => user.id === pedido.user_id);
    const bodegaDetail = bodegas.find(bodega => bodega.id === pedido.bodega_id);

    setPedidoDetalle({
      ...pedido,
      userDetail,
      bodegaDetail
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPedidoDetalle(null); // Limpiar los detalles del pedido cuando se cierra el modal
  };

  const handleSelectPedido = (id) => {
    if (pedidosSeleccionados.includes(id)) {
      setPedidosSeleccionados(pedidosSeleccionados.filter(pedidoId => pedidoId !== id));
    } else {
      setPedidosSeleccionados([...pedidosSeleccionados, id]);
    }
  };

  useEffect(() => {
    if (pedidosSeleccionados.length > 0) {
      infoUsuarios();
      infoBodega();
    } else {
      setUsuariosFinal([]);
      setBodegasFinal([]);
    }
  }, [pedidosSeleccionados]);

  const infoBodega = () => {
    const bodegaIds = pedidosSeleccionados.map(pedidoId => {
      const pedido = pedidos.find(p => p.id === pedidoId);
      return pedido ? pedido.bodega_id : null;
    }).filter(bodegaId => bodegaId !== null);

    const bodegasSeleccionadas = bodegaIds.map(bodegaId => bodegas.find(b => b.id === bodegaId)).filter(bodega => bodega !== undefined);

    setBodegasFinal(bodegasSeleccionadas);
  };


  const infoUsuarios = () => {
    const userIds = pedidosSeleccionados.map(pedidoId => {
      const pedido = pedidos.find(p => p.id === pedidoId);
      return pedido ? pedido.user_id : null;
    }).filter(userId => userId !== null);

    const usuariosSeleccionados = userIds.map(userId => users.find(u => u.id === userId)).filter(user => user !== undefined);
    setUsuariosFinal(usuariosSeleccionados);
  };


  const handleFacturarClick = async () => {
    try {
        const facturasInsertadas = [];
        const bodegasActualizadas = {};
        const emisor = empresa.find(b => b.id);

        console.log("Inicio de facturación");

        const facturasParaInsertar = [];
        const detalleParaInsertar = [];

        for (const pedidoId of pedidosSeleccionados) {
            console.log(`Procesando pedidoId: ${pedidoId}`);
            const pedido = pedidos.find(p => p.id === pedidoId);
            const usuario = users.find(u => u.id === pedido.user_id);
            const bodega = bodegas.find(b => b.id === pedido.bodega_id);
            const pedido_descripciones = pedidoDescripcion.filter(p => p.codigo_pedido === pedido.codigo_pedido);

            if (pedido && usuario && bodega) {
                let consecutivoActualizado;
                if (!bodegasActualizadas[bodega.id]) {
                    consecutivoActualizado = bodega.consecutivo_actual + 1;
                    bodegasActualizadas[bodega.id] = {
                        ...bodega,
                        consecutivo_actual: consecutivoActualizado
                    };
                } else {
                    consecutivoActualizado = bodegasActualizadas[bodega.id].consecutivo_actual + 1;
                    bodegasActualizadas[bodega.id].consecutivo_actual = consecutivoActualizado;
                }

                const numeroFactura = `${bodegasActualizadas[bodega.id].prefijo}${consecutivoActualizado}`;
                console.log(`Generando factura para pedido ${pedido.codigo_pedido} con número de factura ${numeroFactura} y consecutivo ${consecutivoActualizado}`);

                facturasParaInsertar.push({
                    bodega_id: bodega.id,
                    codigo_pedido: pedido.codigo_pedido,
                    factura_id: numeroFactura,
                    tipo_documento_emisor: emisor.tipo_documento,
                    numero_documento_emisor: emisor.numero_documento,
                    direccion_emisor: emisor.direccion,
                    nombre_emisor: emisor.razon_social,
                    telefono_emisor: emisor.telefono,
                    id_receptor: usuario.id,
                    nombre_receptor: usuario.nombre_final,
                    direccion_receptor: usuario.direccion,
                    telefono_receptor: usuario.telefono,
                    email_receptor: usuario.email,
                    tipo_documento_receptor: usuario.tipo_documento,
                    numero_documento_receptor: usuario.numero_documento,
                    subtotal: pedido.subtotal,
                    valor_total: pedido.valor_total,
                    firma_digital: emisor.firma_digital,
                    iva: pedido.iva,
                    resolucion_facturacion: bodega.resolucion,
                    prefijo: bodega.prefijo,
                    consecutivo: consecutivoActualizado,
                    fecha_emision: pedido.fecha_creacion,
                    fecha_facturacion: pedido.fecha_creacion,
                    forma_pago: pedido.forma_pago,
                    moneda: 'COP',
                    medios_pago: pedido.medio_pago,
                });

                // Iterar sobre cada producto del pedido
                for (const descripcion of pedido_descripciones) {
                    detalleParaInsertar.push({
                        factura_id: numeroFactura,
                        material_id: descripcion.material_id,
                        descripcion: descripcion.material_name,
                        lista_precios: descripcion.lista_precios,
                        valor_unitario: descripcion.precio_venta,
                        cantidad: descripcion.cantidad,
                        descuento_porcentaje: descripcion.descuento_porcentaje,
                        descuento: descripcion.descuento,
                        valor_total: descripcion.total_material,
                    });
                }

                facturasInsertadas.push({
                    ...facturasParaInsertar[facturasParaInsertar.length - 1],
                    consecutivo_actualizado: consecutivoActualizado
                });
            } else {
                console.log(`Pedido, usuario o bodega no encontrados para pedidoId: ${pedidoId}`);
            }
        }

        console.log("Facturas para insertar:", facturasParaInsertar);
        console.log("Detalle para insertar:", detalleParaInsertar);

        const { data: facturasData, error: facturasError } = await supabase.from('facturacion').insert(facturasParaInsertar);
        if (facturasError) {
            console.error("Error al insertar facturas:", facturasError.message);
            throw facturasError;
        }

        if (detalleParaInsertar.length > 0) {
            const { data: detallesData, error: detallesError } = await supabase.from("factura_detalle").insert(detalleParaInsertar);
            if (detallesError) {
                console.error("Error al insertar el detalle de las facturas:", detallesError.message);
                throw detallesError;
            } else {
                console.log("Detalles de facturas insertados correctamente:", detallesData);
            }
        } else {
            console.log("No hay detalles para insertar.");
        }

        for (const bodegaId in bodegasActualizadas) {
            const { consecutivo_actual } = bodegasActualizadas[bodegaId];
            console.log(`Actualizando bodega ${bodegaId} con el consecutivo_actual valor: ${consecutivo_actual}`);
            const { error: updateError } = await supabase
                .from('bodegas')
                .update({ consecutivo_actual })
                .eq('id', bodegaId);
            if (updateError) {
                console.error(`Error al actualizar bodega ${bodegaId}:`, updateError.message);
                throw updateError;
            }
        }

        const { error: estadoError } = await supabase
            .from('pedidos')
            .update({ estado: '🟢' })
            .in('id', pedidosSeleccionados);
        if (estadoError) {
            console.error(`Error al actualizar estado de pedidos:`, estadoError.message);
            throw estadoError;
        }

        alert("Pedidos facturados correctamente.");
        window.location.reload();

        return facturasInsertadas.map(factura => factura.consecutivo_actualizado);

    } catch (error) {
        console.error("Error al facturar los pedidos:", error.message);
    }
};

  
  const handleSelectAll = () => {
    if (selectAll) {
      setPedidosSeleccionados([]);
    } else {
      setPedidosSeleccionados(pedidos.map(pedido => pedido.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto my-8">
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
          <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <ButtonFastCali onClick={handleFacturarClick} text={`Facturar`} />
          </div>
          {cargandoPedidos ? (
            <p>Cargando pedidos...</p>
          ) : (
            <div className="overflow-x-auto mt-10">
              <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-gray-800">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectAll}
                      />
                    </th>
                    <th className="border px-4 py-2 bg-gray-800">Codigo Pedido</th>
                    <th className="border px-4 py-2 bg-gray-800">Bodega</th>
                    <th className="border px-4 py-2 bg-gray-800">Cliente</th>
                    <th className="border px-4 py-2 bg-gray-800">Total</th>
                    <th className="border px-4 py-2 bg-gray-800">Pedido</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos
                    .filter(pedido => pedido.estado !== '🟢')
                    .map((pedido, index) => (
                      <tr key={pedido.codigo_pedido} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            onChange={() => handleSelectPedido(pedido.id)}
                            checked={pedidosSeleccionados.includes(pedido.id)}
                          />
                        </td>
                        <td className="border px-4 py-2">{pedido.codigo_pedido}</td>
                        <td className="border px-4 py-2">{pedido.bodega_id}</td>
                        <td className="border px-4 py-2">{pedido.user_name}</td>
                        <td className="border px-4 py-2">{pedido.valor_total}</td>
                        <td className="border px-4 py-2 cursor-pointer">
                          <button
                            className="underline text-blue-500 hover:text-blue-700 focus:outline-none"
                            onClick={() => toggleModal(pedido)}
                          > Ver detalles
                          </button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Codigo Pedido</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.codigo_pedido}</td>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Medio Pago</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedidoDetalle.forma_pago}</td>
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
    </>
  );
}

export default Facturacion;
