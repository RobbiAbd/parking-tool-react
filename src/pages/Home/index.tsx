import {useState} from "react";
import Input from "../../components/1_elements/Input";
import Button from "../../components/1_elements/Button";
import Label from "../../components/1_elements/Label";
import MainLayout from "../../components/4_templates/MainLayout.tsx";
import Select from "../../components/1_elements/Select.tsx";
import Card from "../../components/1_elements/Card.tsx";
import ParkingTable from "../../components/3_modules/ParkingTable.tsx";

interface FormFields {
    platNomor: string;
    waktuMasuk: string;
    waktuKeluar: string;
    jenisKendaraan: string;
}

export default function Home() {
    const [formData, setFormData] = useState<FormFields>({
        platNomor: "",
        jenisKendaraan: "",
        waktuMasuk: "",
        waktuKeluar: "",
    });

    const handleChange = (field: keyof FormFields) => (value: string) => {
        setFormData((prevData) => ({...prevData, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    };

    return (
        <MainLayout>
            <p className="text-4xl text-center font-bold mb-10">Parkir Kendaraan</p>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <Label htmlFor="jenisKendaraan">Jenis Kendaraan</Label>
                            <Select items={["Mobil", "Motor"]}/>
                        </div>

                        <div className="mt-14">
                            <div className="mb-2">
                                <Label htmlFor="waktuMasuk">Waktu Masuk</Label>
                                <Input
                                    id="waktuMasuk"
                                    value={formData.waktuMasuk}
                                    setValue={handleChange("waktuMasuk")}
                                    placeholder="Waktu Masuk"
                                    className={"w-full"}
                                    readOnly={true}
                                />
                            </div>

                            <div className="mb-2">
                                <Label htmlFor="waktuKeluar">Waktu Keluar</Label>
                                <Input
                                    id="waktuKeluar"
                                    value={formData.waktuKeluar}
                                    setValue={handleChange("waktuKeluar")}
                                    placeholder="Waktu Keluar"
                                    className={"w-full"}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="mt-4">

                            <div className="flex">
                                <div className="flex-initial">
                                    <Button
                                        type="submit"
                                        onClick={() => {
                                            console.log("onclick submit");
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div className="flex-initial px-4">
                                    <Button
                                        type="reset"
                                        onClick={() => {
                                            console.log("onclick reset");
                                        }}

                                        className="bg-amber-600"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-span-2">
                    <div className="mb-2">
                        <Label htmlFor="platNomor">Plat Nomor</Label>
                        <Input
                            id="platNomor"
                            value={formData.platNomor}
                            setValue={handleChange("platNomor")}
                            placeholder="Plat Nomor"
                            className={"w-full"}
                        />
                    </div>

                    <Card>
                        <p className="text-9xl text-center py-3">Rp. 6000</p>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="col-span-1">
                    <Card>
                        <p className="text-5xl text-center py-3">2</p>
                    </Card>
                </div>

                <div className="col-span-2">
                    <Card>
                        <p className="text-5xl text-center py-3">Rp. 0</p>
                    </Card>
                </div>
            </div>

            <div className="mt-5">
                <ParkingTable/>
            </div>
        </MainLayout>
    );
}
