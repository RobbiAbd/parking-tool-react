import { useState } from 'react';
import Button from "../../components/1_elements/Button";
import Input from "../1_elements/Input";
import useParkingStore from "../../@stores/useParkingStore.ts";
import ParkingConstant from "../../@hooks/constant/ParkingConstant.ts";
import {calculatePayment} from "../../@utils/helper.ts";

interface FilterFields {
    searchTerm: string;
}

interface ParkingTableProps {
    onBiayaChange: (newBiaya: number) => void;
    onRowSelect: (rowData: ParkingConstant) => void; // Adjust 'any' to your specific data type
}

export default function ParkingTable({ onRowSelect, onBiayaChange }: ParkingTableProps) {
    const { data } = useParkingStore();
    const [filterFields, setFilterFields] = useState<FilterFields>({ searchTerm: '' });

    const filteredData = data.filter(row =>
        row.platNomor.toLowerCase().includes(filterFields.searchTerm.toLowerCase())
    );

    const handleSearchChange = (value: string) => {
        setFilterFields({ ...filterFields, searchTerm: value });
    };

    const handleRowSelect = (row: ParkingConstant) => {
        const payment = calculatePayment(row.jenisKendaraan, row.waktuMasuk);
        onBiayaChange(payment); // Pass the calculated payment to the parent
        onRowSelect(row); // Call the passed function with the selected row data
    };

    return (
        <>
            <div className="flex justify-end">
                <Input
                    id="search"
                    value={filterFields.searchTerm}
                    setValue={handleSearchChange}
                    placeholder="Search by Plat Nomor"
                    className="mb-4 w-1/4"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-bg border border-border rounded-base shadow-light">
                    <thead>
                    <tr className="bg-main text-white">
                        <th className="py-2 px-4 border-b border-border text-left font-heading text-gray-800">Plat Nomor</th>
                        <th className="py-2 px-4 border-b border-border text-left font-heading text-gray-800">Jenis Kendaraan</th>
                        <th className="py-2 px-4 border-b border-border text-left font-heading text-gray-800">Waktu Masuk</th>
                        <th className="py-2 px-4 border-b border-border text-left font-heading text-gray-800">Waktu Keluar</th>
                        <th className="py-2 px-4 border-b border-border text-left font-heading text-gray-800">Status</th>
                        <th className="py-2 px-4 border-b border-border text-left font-heading text-gray-800">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className="even:bg-mainAccent odd:bg-bg">
                            <td className="py-2 px-4 border-b border-border text-text font-base">{row.platNomor}</td>
                            <td className="py-2 px-4 border-b border-border text-text font-base">{row.jenisKendaraan}</td>
                            <td className="py-2 px-4 border-b border-border text-text font-base">{row.waktuMasuk}</td>
                            <td className="py-2 px-4 border-b border-border text-text font-base">{row.waktuKeluar}</td>
                            <td className="py-2 px-4 border-b border-border">
                                    <span className={`px-2 py-1 rounded-base font-base ${row.status === 'Sudah Bayar' ? 'bg-main text-white' : 'bg-secondaryBlack text-darkText'}`}>
                                        {row.status}
                                    </span>
                            </td>
                            <td className="py-2 px-4 border-b border-border">
                                {row.status === 'Belum Bayar' && (
                                    <Button
                                        type="button"
                                        onClick={() => handleRowSelect(row)} // Pass the row data to the function
                                        className="bg-indigo-400"
                                    >
                                        Tampilkan
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
