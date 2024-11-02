export const calculatePayment = (jenisKendaraan: string, waktuMasuk: string): number => {
    // Function to convert the input string to a valid date object
    const parseDateString = (dateString: string) => {
        // Split the date and time
        const [datePart, timePart] = dateString.split(', ');

        // Replace slashes with hyphens and periods with colons for the time
        const [day, month, year] = datePart.split('/').map(part => part.padStart(2, '0')); // Ensure double digits
        const formattedDateString = `${year}-${month}-${day}T${timePart.replace(/\./g, ':')}`;

        return new Date(formattedDateString);
    };

    const masukDate = parseDateString(waktuMasuk);
    const keluarDate = new Date(); // Current date and time for keluar

    // Check for valid date objects
    if (isNaN(masukDate.getTime())) {
        throw new Error("Invalid date provided. Please check the format of 'waktuMasuk'.");
    }

    const diffInHours = (keluarDate.getTime() - masukDate.getTime()) / (1000 * 60 * 60);
    let biaya = 0;

    // Ensure charging at least 1 hour even if less than an hour is parked
    const hoursCharged = Math.max(1, Math.ceil(diffInHours)); // Always charge for at least 1 hour

    if (jenisKendaraan === "Motor") {
        if (hoursCharged <= 1) {
            biaya = 2000;
        } else if (hoursCharged <= 2) {
            biaya = 4000;
        } else {
            biaya = 6000;
        }
    } else if (jenisKendaraan === "Mobil") {
        if (hoursCharged <= 1) {
            biaya = 4000;
        } else if (hoursCharged <= 2) {
            biaya = 6000;
        } else {
            biaya = 10000;
        }
    }

    return biaya;
};


export const rupiahFormat = (number : number) : string => {
    const currency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol', // Optional: To display the symbol (e.g., Rp)
        minimumFractionDigits: 0, // No decimal places
        maximumFractionDigits: 0, // No decimal places
    });

    return currency.format(number);
}