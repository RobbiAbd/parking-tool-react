import { create } from "zustand";
import ParkingConstant from "../@hooks/constant/ParkingConstant.ts";

interface ParkingStore {
    data: ParkingConstant[];
    setData: (data: ParkingConstant[] | ((prevData: ParkingConstant[]) => ParkingConstant[])) => void;
}

const useParkingStore = create<ParkingStore>((set) => ({
    data: [],
    setData: (newData) =>
        set((state) => {
            // Check if newData is a function
            if (typeof newData === "function") {
                return { data: newData(state.data) };
            }
            return { data: [...state.data, ...newData] };
        }),
}));

export default useParkingStore;
