import Select, { SingleValue, StylesConfig } from 'react-select';
import { ChevronDown } from 'heroicons-react';
import { useEffect, useState } from 'react';
import {FieldValues, UseFormSetValue} from "react-hook-form";


interface DropdownProps {
    id: string;
    title: string;
    placeholder?: string;
    list: string[];
    setValue: UseFormSetValue<FieldValues>
    onSubmit?: (value: string | null) => void;
    required?: boolean;
    resetForm?: boolean;
}


interface OptionType {
    label: string;
    value: string;
}


const customStyles: StylesConfig<OptionType, false> = {
    container: (provided) => ({
        ...provided,
        marginTop: '8px',
        width: '100%',
    }),
    control: (provided, state) => ({
        ...provided,
        display: 'flex',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '1rem',
        borderColor: state.isFocused ? '#02373AFF' : '#02373AFF',
        backgroundColor: 'transparent',
        padding: '0.5rem 0.75rem',
        boxShadow: state.isFocused ? '0 0 0 2px #3182CE' : 'none',
        ':hover': {
            borderColor: "#02373AFF",
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0',
        padding: '0',
        color: '#FFFFFF',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#d5dee9',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#cdcfd4',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#000d11',
        borderRadius: '1rem',
        borderColor: '#02373AFF',
        border: `1px solid #02373AFF`,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        marginTop: '10px',
        paddingLeft:'20px',
        paddingTop:'10px',
    }),
    menuList: (provided) => ({
        ...provided,

        '::-webkit-scrollbar': {
            width: '7px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(2,56,43,0.86)',
            borderRadius: '4px',
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        borderColor:  'rgba(2,56,43,0.86)',

    }),
    option: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: state.isSelected ? 'rgba(2,56,43,0.86)' : 'transparent',
        color: state.isSelected ? '#eaeaea' : '#e9e0e0',
        ':hover': {
            backgroundColor: 'rgba(2,56,43,0.86)',
            color: '#f1f0f1',
        },

        borderRadius: '1rem',
    }),
};


const SearchableDropdown = (props: DropdownProps) => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);


    const handleChange = (selectedOption: SingleValue<OptionType>) => {
        props.setValue(props.id, selectedOption ? selectedOption.value : null);
        setSelectedOption(selectedOption);
        if (props.onSubmit) {
            props.onSubmit(selectedOption ? selectedOption.value : null);
        }
    };


    useEffect(() => {
        if (props.resetForm) {
            setSelectedOption(null);
        }
    }, [props.resetForm]);


    const options: OptionType[] = props.list.map(item => ({
        value: item,
        label: item
    }));

    return (
            <Select
                id={props.id}
                onChange={handleChange}
                value={selectedOption}
                options={options}
                placeholder={props.placeholder || 'search'}
                classNamePrefix="react-select"
                styles={customStyles}
                components={{
                    DropdownIndicator: () => (
                        <span className="text-gray-500 ml-2">
                            <ChevronDown className="h-4 w-4" onPointerEnterCapture={undefined}
                                         onPointerLeaveCapture={undefined} />
                        </span>
                    ),
                    IndicatorSeparator: () => null
                }}
                required={props.required}
            />

    );
};

export default SearchableDropdown;
