import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {FieldValues, UseFormRegister} from "react-hook-form";


interface InputProps {
    id:string
    inputType: 'input' | 'textArea';
    title:string
    required?:boolean
    register: UseFormRegister<FieldValues>
    error?:any
}

export const InputItem = (props: InputProps) => {
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
            ) : null
            }

        </>
    );
};
