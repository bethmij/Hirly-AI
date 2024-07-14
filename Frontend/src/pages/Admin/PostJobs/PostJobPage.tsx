import z from "zod";
import {InputItem} from "@/components/shared/InputItems/InputItem.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {jobTypes, cities, rdCities, rdJobTypes} from "@/assets/Data/arrays.ts"
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {postJob} from "@/lib/services/api/job.ts";

const postJobSchema = z.object({
    title: z.string().min(10, {message: "Title should at least contain 10 characters"}),
    description: z.string().min(20, {message: "Description should at least contain 20 characters"}),
    type: z.enum(rdJobTypes),
    location: z.enum(rdCities),
    question1: z.string().min(50),
    question2: z.string().min(50),
    question3: z.string().min(50),
})


export const PostJobPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset
    } = useForm({resolver: zodResolver(postJobSchema)});
    const [resetForm, setResetForm] = useState(false);

    const onSubmit = async (data: FieldValues) => {

        data.questions = [data.question1, data.question2, data.question3]
        try {
            await postJob(data);
            reset();
            setResetForm(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1 className="w-full text-center mt-10 text-4xl opacity-80">Create A Job Posting</h1>

            <form className="flex flex-col gap-y-10 px-40 mt-10" onSubmit={handleSubmit(onSubmit)}>

                <InputItem id={"title"} inputType={"input"} title={"Title"} register={register} required={true}
                           error={errors.title}/>

                <InputItem id={"description"} inputType={"textArea"} title={"Description"} register={register}
                           required={true} error={errors.description}/>

                <InputItem id={"type"} inputType={"select"} title={"Type"} register={register} selectItemList={jobTypes}
                           required={false} error={errors.type} setValue={setValue} isResetForm={resetForm}/>

                <InputItem id={"location"} inputType={"comboBox"} title={"Location"} register={register} error={errors}
                           selectItemList={cities} setValue={setValue} required={true} isResetForm={resetForm}/>

                <InputItem id={"question1"} inputType={"textArea"} title={"Question 1"} register={register}
                           error={errors.question1}/>

                <InputItem id={"question2"} inputType={"textArea"} title={"Question 2"} register={register}
                           error={errors.question2}/>

                <InputItem id={"question3"} inputType={"textArea"} title={"Question 3"} register={register}
                           error={errors.question3}/>

                <div className="flex gap-x-5 mt-10 ">
                    <Button type="submit" className="text-xl mb-20">Submit</Button>
                </div>
            </form>

        </>
    )
}

