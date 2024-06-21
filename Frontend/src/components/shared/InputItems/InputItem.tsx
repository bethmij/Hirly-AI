import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {FieldValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ComboBoxItem} from "@/components/shared/ComboBox/ComboBox.tsx";
import {useState} from "react";


interface InputProps {
    id: string
    inputType: 'input' | 'textArea' | 'select' | 'comboBox';
    title: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    error?: any
    selectItemList?: string[]
    setValue?: UseFormSetValue<FieldValues>
    onSubmit?: (value: any)=> void

}

export const InputItem = (props: InputProps) => {
    const [selectedOption, setSelectedOption] = useState("");


    return (
        <>
            {props.inputType === 'input' ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl">{props.title}</Label>
                    <Input className="mb-4"
                           {...props.register(props.id)}
                           id={props.id}
                           name={props.id}
                           required={props.required || false}/>
                </div>

            ) : props.inputType === 'textArea' ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl mb-2">{props.title}</Label>
                    <Textarea {...props.register(props.id)}
                              id={props.id}
                              name={props.id}
                              required={props.required || false}></Textarea>
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>

            ) : props.inputType === "select" ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl mb-2">{props.title}</Label>
                    <Select
                        onValueChange={value => setSelectedOption(value)}
                        value={selectedOption}
                        required={props.required}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="select"/>
                        </SelectTrigger>
                        <SelectContent>
                            {props.selectItemList?.map(item => {
                                return <SelectItem key={item} value={item}>{item}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>

            ) : props.inputType === "comboBox" && Array.isArray(props.selectItemList) ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl mb-2">{props.title}</Label>
                    <ComboBoxItem statuses={props.selectItemList}/>
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>

            ) : null
            }

        </>
    );
};
