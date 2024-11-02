import {useState} from "react";
import Input from "../../components/1_elements/Input";
import Button from "../../components/1_elements/Button";
import Label from "../../components/1_elements/Label";
import MainLayout from "../../components/4_templates/MainLayout.tsx";
import Select from "../../components/1_elements/Select.tsx";
import Card from "../../components/1_elements/Card.tsx";
import ParkingTable from "../../components/3_modules/ParkingTable.tsx";
import ParkingConstant from "../../@hooks/constant/ParkingConstant.ts";
import useParkingStore from "../../@stores/useParkingStore.ts";
import {rupiahFormat} from "../../@utils/helper.ts";

export default function Home() {
    const {data, setData} = useParkingStore();
    const entryCount = data.length;

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [biaya, setBiaya] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [buttonText, setButtonText] = useState("Submit");

    const [formData, setFormData] = useState<ParkingConstant>({
        platNomor: "",
        jenisKendaraan: "",
        waktuMasuk: "",
        waktuKeluar: "",
        status: "",
    });

    const handleChange = (field: keyof ParkingConstant) => (value: string) => {
        setFormData((prevData) => {
            const newData = {...prevData, [field]: value};

            // If the field being changed is jenisKendaraan, set waktuMasuk to current date/time
            if (field === "jenisKendaraan") {
                newData.waktuMasuk = new Date().toLocaleString("id-ID"); // Set current date/time
            }

            return newData;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (biaya !== 0) {
            handlePayment(formData.platNomor)
        } else {
            const errors = validateForm(); // Validate the form fields
            if (Object.keys(errors).length > 0) {
                // If there are errors, set them to the state and return
                setFormErrors(errors);
                return;
            }

            setData([
                {
                    platNomor: formData.platNomor,
                    jenisKendaraan: formData.jenisKendaraan,
                    waktuMasuk: formData.waktuMasuk,
                    waktuKeluar: formData.waktuKeluar,
                    status: 'Belum Bayar'
                }
            ]);
        }

        setFormData({
            platNomor: "",
            jenisKendaraan: "",
            waktuMasuk: "",
            waktuKeluar: "",
            status: ""
        });

        setFormErrors({})
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault()

        setFormData({
            platNomor: "",
            jenisKendaraan: "",
            waktuMasuk: "",
            waktuKeluar: "",
            status: ""
        });

        setButtonText("Submit")
    }

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const existingPlates = data.map(entry => entry.platNomor); // Assuming `data` is your parking entries from Zustand

        if (!formData.jenisKendaraan) {
            errors.jenisKendaraan = "Jenis Kendaraan is required.";
        }

        if (!formData.waktuMasuk) {
            errors.waktuMasuk = "Waktu Masuk is required.";
        }

        if (!formData.platNomor) {
            errors.platNomor = "Plat Nomor is required.";
        } else if (existingPlates.includes(formData.platNomor)) {
            errors.platNomor = "Plat Nomor must be unique.";
        }

        return errors;
    };

    const populateFormWithRowData = (rowData: ParkingConstant) => {
        rowData.waktuKeluar = new Date().toLocaleString("id-ID")
        setFormData(rowData);
    };

    const handleBiayaChange = (newBiaya: number) => {
        setBiaya(newBiaya); // Update the biaya state
        setButtonText("Payment")
    };

    const handlePayment = (platNomor: string) => {
        const selectedEntry = data.find(entry => entry.platNomor === platNomor);
        if (selectedEntry) {
            setData((prevData) => prevData.filter((entry) => entry.platNomor !== platNomor));

            // Add biaya to balance
            setBalance((prevBalance) => prevBalance + biaya);

            // Reset the button text back to Submit
            setButtonText("Submit");

            // Reset biaya after payment
            setBiaya(0);
        }
    };

    return (
        <MainLayout>
            <p className="text-4xl text-center font-bold mb-10">Parkir Kendaraan</p>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <Label htmlFor="jenisKendaraan">Jenis Kendaraan <span
                                className="text-red-700">*</span></Label>
                            <Select items={["Mobil", "Motor"]} value={formData.jenisKendaraan}
                                    setValue={handleChange("jenisKendaraan")}/>
                            {formErrors.jenisKendaraan && <p className="text-red-800">{formErrors.jenisKendaraan}</p>}
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
                                {formErrors.waktuMasuk && <p className="text-red-800">{formErrors.waktuMasuk}</p>}
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
                                        {buttonText}
                                    </Button>
                                </div>
                                <div className="flex-initial px-4">
                                    <Button
                                        type="reset"
                                        onClick={handleReset}

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
                        <Label htmlFor="platNomor">Plat Nomor <span className="text-red-700">*</span></Label>
                        <Input
                            id="platNomor"
                            value={formData.platNomor}
                            setValue={(value) => handleChange("platNomor")(value.toUpperCase())}
                            placeholder="Plat Nomor"
                            className={"w-full"}
                        />
                        {formErrors.platNomor && <p className="text-red-800">{formErrors.platNomor}</p>}
                    </div>

                    <Card title="Biaya Parkir">
                        <p className="text-9xl text-center py-3">{rupiahFormat(biaya)}</p>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="col-span-1">
                    <Card title="Jumlah Kendaraan">
                        <p className="text-5xl text-center py-3">{entryCount}</p>
                    </Card>
                </div>

                <div className="col-span-2">
                    <Card title="Saldo">
                        <p className="text-5xl text-center py-3">{rupiahFormat(balance)}</p>
                    </Card>
                </div>
            </div>

            <div className="mt-5">
                <ParkingTable onRowSelect={populateFormWithRowData} onBiayaChange={handleBiayaChange}/>
            </div>
        </MainLayout>
    );
}
