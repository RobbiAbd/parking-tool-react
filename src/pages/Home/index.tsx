import { useState } from "react";
import Input from "../../components/1_elements/Input";
import Button from "../../components/1_elements/Button";
import Label from "../../components/1_elements/Label";

interface FormFields {
  platNomor: string;
  tanggalMasuk: string;
  tanggalKeluar: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormFields>({
    platNomor: "",
    tanggalMasuk: "",
    tanggalKeluar: "",
  });

  const handleChange = (field: keyof FormFields) => (value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Label htmlFor="platNomor">Plat Nomor</Label>
              <Input
                id="platNomor"
                value={formData.platNomor}
                setValue={handleChange("platNomor")}
                placeholder="Plat Nomor"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="Tanggal Masuk">Tanggal Masuk</Label>
              <Input
                id="tanggalMasuk"
                value={formData.tanggalMasuk}
                setValue={handleChange("tanggalMasuk")}
                placeholder="Tanggal Masuk"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="tanggalKeluar">Tanggal Keluar</Label>
              <Input
                id="tanggalKeluar"
                value={formData.tanggalKeluar}
                setValue={handleChange("tanggalKeluar")}
                placeholder="Tanggal Keluar"
              />
            </div>

            <Button
              onClick={() => {
                console.log("submit");
              }}
            >
              Submit
            </Button>
          </form>
        </div>

        <div>{formData.platNomor}</div>
      </div>

      <table className="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
