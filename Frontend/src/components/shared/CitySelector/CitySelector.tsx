import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu.tsx';
import { BsFillCaretDownFill } from 'react-icons/bs'; // Example dropdown icon
import { FiCheck } from 'react-icons/fi'; // Example check icon

const cities = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle',
    'Matara', 'Hambantota', 'Jaffna', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa',
    'Ampara', 'Trincomalee', 'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa',
    'Badulla', 'Moneragala', 'Ratnapura', 'Kegalle'
];

type CitySelectProps = {
    onSelectCity?: (city: string) => void;
};

const CitySelect: React.FC<CitySelectProps> = ({ onSelectCity }) => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const handleSelect = (city: string) => {
        setSelectedCity(city);
        if (onSelectCity) {
            onSelectCity(city);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="mr-1">{selectedCity ?? 'Select a city'}</span>
                        <BsFillCaretDownFill className="mt-1.5 h-4 w-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Choose a city</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {cities.map((city) => (
                        <DropdownMenuItem
                            key={city}
                            onClick={() => handleSelect(city)}
                            className={`${
                                selectedCity === city ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            }`}
                        >
                            {selectedCity === city && (
                                <FiCheck className="inline-block mr-2 h-5 w-5" />
                            )}
                            {city}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default CitySelect;
