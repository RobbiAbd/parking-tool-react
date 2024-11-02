import { useState } from 'react';
import Button from "../../components/1_elements/Button";
import Input from "../1_elements/Input";

interface FilterFields {
    searchTerm: string;
}

export default function ParkingTable() {
    const data = [
        {
            platNomor: 'B 1234 ABC',
            jenisKendaraan: 'Mobil',
            waktuMasuk: '2024-11-02 08:00',
            waktuKeluar: '2024-11-02 10:30',
            status: 'Sudah Bayar'
        },
        {
            platNomor: 'D 5678 DEF',
            jenisKendaraan: 'Motor',
            waktuMasuk: '2024-11-02 09:00',
            waktuKeluar: '2024-11-02 11:00',
            status: 'Belum Bayar'
        },
        // Add more rows as needed
    ];

    const [filterFields, setFilterFields] = useState<FilterFields>({ searchTerm: '' });

    const filteredData = data.filter(row =>
        row.platNomor.toLowerCase().includes(filterFields.searchTerm.toLowerCase())
    );

    const handlePayment = (platNomor: string) => {
        console.log(`Processing payment for ${platNomor}`);
    };

    const handleSearchChange = (value: string) => {
        setFilterFields({ ...filterFields, searchTerm: value });
    };

    return (
        <div className="overflow-x-auto">
            <Input
                id="search"
                value={filterFields.searchTerm}
                setValue={handleSearchChange} // Using the handler for input change
                placeholder="Search by Plat Nomor"
                className="mb-4 w-full"
            />

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
                            <span
                                className={`px-2 py-1 rounded-base font-base ${
                                    row.status === 'Sudah Bayar'
                                        ? 'bg-main text-white'
                                        : 'bg-secondaryBlack text-darkText'
                                }`}
                            >
                                {row.status}
                            </span>
                        </td>
                        <td className="py-2 px-4 border-b border-border">
                            {row.status === 'Belum Bayar' && (
                                <Button
                                    type="button"
                                    onClick={() => handlePayment(row.platNomor)}
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
    );
}
