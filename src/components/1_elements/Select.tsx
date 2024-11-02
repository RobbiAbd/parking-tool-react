import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SelectProps {
    items: string[];
    value: string; // New prop for the current value
    setValue: (value: string) => void; // Prop for setting the value in the parent
}

export default function Select({ items, value, setValue }: SelectProps) {
    const [selectedItem, setSelectedItem] = useState<string | null>(value); // Initialize with current value
    const [isActiveSelect, setIsActiveSelect] = useState(false);

    // Update selectedItem whenever the value prop changes
    useEffect(() => {
        setSelectedItem(value);
    }, [value]);

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName); // Update the selected item
        setValue(itemName);        // Pass the selected item back to the parent
        setIsActiveSelect(false);   // Close the dropdown
    };

    const toggleSelect = () => {
        setIsActiveSelect((prev) => !prev); // Toggle dropdown visibility
    };

    return (
        <div
            data-state={isActiveSelect ? 'open' : 'closed'}
            className="relative text-text w-full"
            aria-expanded={isActiveSelect}
        >
            <button
                type="button"
                onClick={toggleSelect}
                onBlur={() => {
                    setIsActiveSelect(false); // Close dropdown on blur
                }}
                aria-haspopup="listbox"
                aria-labelledby="select-label"
                className={`flex w-full cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-10 py-3 font-base shadow-light dark:shadow-dark transition-all 
                    ${isActiveSelect ? 'translate-x-boxShadowX translate-y-boxShadowY shadow-none dark:shadow-none' : 'hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none'}`}
            >
                <div className="mx-auto flex items-center">
                    {selectedItem === null ? 'Select' : selectedItem}
                    <ChevronDown
                        className="ml-2 h-5 w-5 transition-transform ease-in-out"
                    />
                </div>
            </button>
            <div
                role="listbox"
                aria-labelledby="select-label"
                className={`absolute left-0 w-full overflow-x-hidden rounded-base border-2 border-border dark:border-darkBorder font-base shadow-light dark:shadow-dark transition-all ${
                    isActiveSelect ? 'top-20 opacity-100 visible' : 'invisible top-[50px] opacity-0'
                }`}
            >
                {items.map((item, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => handleItemClick(item)} // Update selected item and close dropdown
                        className="block w-full border-b-2 border-border dark:border-darkBorder bg-main px-5 py-3 hover:bg-mainAccent"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}
