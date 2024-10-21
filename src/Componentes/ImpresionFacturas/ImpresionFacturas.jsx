import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import Invoice from './Invoice';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import styles from "../../style";
import BotonBuscar from './BotonBuscar';
import Table from './Table';
import InvoiceGroup from './invoinceGrupo';
import { useFetchFacturas } from '../Hooks/useFetchFacturas';
import { useFetchHistorialP } from '../Hooks/useFetchHistorialP';
import { useFetchEmpresas } from '../Hooks/useFetchEmpresa';
import { useFetchDetallesFactura } from '../Hooks/useFetchDetallesFactura';
import logo from '../../assets/logo.png'

export const ImpresionFacturas = () => {
    const [showFilterForm, setShowFilterForm] = useState(false);
    const [showSearchButton, setShowSearchButton] = useState(true);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [facturas, setFacturas] = useState([])
    const [detalleFacturas, setDetalleFacturas] = useState([])
    const [empresa, setEmpresa] = useState([])
    const [invoices, setInvoices] = useState([])

    useFetchFacturas(setFacturas);
    useFetchEmpresas(setEmpresa)
    useFetchDetallesFactura(setDetalleFacturas)

    const componentRef = useRef();


    useEffect(() => {
        if (facturas.length && detalleFacturas && empresa.length) {
            const mappedInvoices = facturas.map(factura => {
                console.log('Procesando factura:', factura.id); // Cambiado de factura.factura_id a factura.id
                
                const detalles = detalleFacturas.filter(d => d.factura_id === factura.factura_id);
                console.log('Detalles filtrados para factura', factura.factura_id, ':', detalles);
    
                return {
                    id: factura.id, // Cambiado de factura.factura_id a factura.id
                    logo: logo,
                    emisor: {
                        nombre: empresa[0]?.razon_social || '',
                        nit: empresa[0]?.numero_documento || '',
                        direccion: empresa[0]?.nit || '',
                        telefono: empresa[0]?.telefono || '',
                        email: empresa[0]?.email || '',
                    },
                    receptor: {
                        nombre: factura.nombre_receptor,
                        nit: factura.numero_documento_receptor,
                        direccion: factura.direccion_receptor,
                        telefono: factura.telefono_receptor || "",
                        email: factura.email_receptor || "",
                    },
                    fecha: factura.fecha_facturacion,
                    numeroFactura: factura.factura_id, // Asumiendo que este es el número de factura
                    items: detalles.map(d => ({
                        descripcion: d.descripcion,
                        cantidad: d.cantidad,
                        valorUnitario: d.valor_unitario,
                        valorTotal: d.cantidad * d.valor_unitario,
                        listaPrecio: d.lista_precios,
                        materialId: d.material_id
                    })),
                    subTotal: factura.subtotal,
                    iva: factura.iva,
                    ivaPorcentaje: factura.iva_porcentaje,
                    total: factura.valor_total,
                    notas: factura.notas || "Gracias por su compra"
                }
            });
    
            console.log('mappedInvoices:', mappedInvoices);
            setInvoices(mappedInvoices);
        }
    }, [facturas, detalleFacturas, empresa]);
    

    const handleSearchClick = () => {
        // Implementa la lógica de búsqueda aquí si es necesario
    }

    const handleOpenSearch = () => {
        setShowFilterForm(true);
        setShowSearchButton(false);
    };

    const handleCancelClick = () => {
        setShowFilterForm(false);
        setShowSearchButton(true);
        setSelectedInvoices([]);
    };

    const handleSelectionChange = (selectedIds) => {
        const selected = invoices.filter(invoice => selectedIds.includes(invoice.id));
        setSelectedInvoices(selected);
    };

    return (
        <>
            <div className="max-w-4xl mx-auto my-8">
                <h1 className="text-white">Impresión Documentos</h1>
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                    {showSearchButton && <ButtonFastCali onClick={handleOpenSearch} text={`Buscar`} />}
                    {showFilterForm && (
                        <>
                            <div className='flex flex-col items-center justify-center gap-x-4'>
                                <ButtonFastCali text={"Cancelar"} onClick={handleCancelClick} />
                                <ButtonFastCali text={"Buscar"} onClick={handleSearchClick} />
                                <BotonBuscar />
                            </div>
                        </>
                    )}
                </div>

                <div className="overflow-x-auto mt-10">
                    <Table
                        invoices={invoices}
                        onSelectionChange={handleSelectionChange}
                    />
                </div>
            </div>
            <div className="max-w-4xl mx-auto my-8">
                <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                    <ReactToPrint
                        trigger={() => <ButtonFastCali text="Imprimir Seleccionadas" />}
                        content={() => componentRef.current}
                        pageStyle={`
                            @page {
                                size: auto;
                                margin: 20mm;
                            }
                            @media print {
                                body {
                                    -webkit-print-color-adjust: exact;
                                }
                            }
                        `}
                    />
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <InvoiceGroup ref={componentRef} invoices={selectedInvoices} />
            </div>
        </>
    );
};