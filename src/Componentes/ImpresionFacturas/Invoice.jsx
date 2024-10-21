// Invoice.js
import React, { forwardRef } from 'react';
import logo from "../../assets/logo.png"


const Invoice = forwardRef(({ data }, ref) => {
    console.log('Datos recibidos en Invoice:', data);
    return (
        <div ref={ref} className="print:block hidden p-8 font-sans text-sm">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                    <h1 className="text-3xl font-bold">Factura Electrónica</h1>
                    <p className="text-gray-600">Emitida conforme a la normativa de la DIAN</p>
                </div>
                <img src={logo} alt="Logo Empresa" className="h-16" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Emisor</h2>
                    <p><strong>Nombre:</strong> {data.emisor.nombre}</p>
                    <p><strong>NIT:</strong> {data.emisor.nit}</p>
                    <p><strong>Dirección:</strong> {data.emisor.direccion}</p>
                    <p><strong>Teléfono:</strong> {data.emisor.telefono}</p>
                    <p><strong>Email:</strong> {data.emisor.email}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Receptor</h2>
                    <p><strong>Nombre:</strong> {data.receptor.nombre}</p>
                    <p><strong>NIT:</strong> {data.receptor.nit}</p>
                    <p><strong>Dirección:</strong> {data.receptor.direccion}</p>
                    <p><strong>Teléfono:</strong> {data.receptor.telefono}</p>
                    <p><strong>Email:</strong> {data.receptor.email}</p>
                </div>
            </div>

            <div className="mb-4">
                <p><strong>Fecha de Emisión:</strong> {data.fecha}</p>
                <p><strong>Número de Factura:</strong> {data.numeroFactura}</p>
            </div>

            <table className="w-full mb-4 border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">Cantidad</th>
                        <th className="border px-4 py-2">Valor Unitario</th>
                        <th className="border px-4 py-2">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data.items) ? data.items.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.descripcion}</td>
                            <td className="border px-4 py-2">{item.cantidad}</td>
                            <td className="border px-4 py-2">{item.valorUnitario}</td>
                            <td className="border px-4 py-2">{item.valorTotal}</td>
                        </tr>
                    )) : <tr><td colSpan="4">No items available</td></tr>}
                </tbody>
            </table>

            <div className="text-right mb-4">
                <p><strong>Subtotal:</strong> {data.subtotal}</p>
                <p><strong>IVA ({data.ivaPorcentaje}%):</strong> {data.iva}</p>
                <p className="text-xl font-bold"><strong>Total:</strong> {data.total}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Código QR</h2>
                <img src={data.codigoQR} alt="Código QR" className="h-32" />
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Notas</h2>
                <p>{data.notas}</p>
            </div>

            <div className="text-center text-gray-600 text-xs mt-4 border-t pt-4">
                <p>Gracias por su compra. Esta factura cumple con todos los requisitos legales.</p>
            </div>
        </div>
    );
});

export default Invoice;
