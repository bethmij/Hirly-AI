import {NavBar} from "@/components/shared/NavBar/NavBar.tsx";
import {InputItem} from "@/components/shared/TextArea/InputItem.tsx";
import {FaBusinessTime} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MdFormatAlignRight} from "react-icons/md";
import z from "zod";
import { FieldValues, useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const questionErrorMsg: string = "answer should consist more than 10 letters";

const schema = z.object({
    name: z.string(),
    question1: z.string().min(10, { message: questionErrorMsg }),
    question2: z.string().min(10, { message: questionErrorMsg }),
    question3: z.string().min(10, { message: questionErrorMsg }),
});

export const JobFormPage = () => {

    const { register, handleSubmit,formState:{errors} , reset} = useForm({ resolver: zodResolver(schema) });

    const onSubmit = (data: FieldValues): void => {
        console.log(data);
        reset()
    }

    const job = {
        title: "Intern - Software Engineer",
        description:
            "We are seeking a motivated and enthusiastic Software Engineering Intern to join our dynamic team. " +
            "As a Software Engineering Intern, you will have the opportunity to work closely " +
            "with experienced developers and contribute to real-world projects. This internship is designed to " +
            "provide valuable hands-on experience, foster professional growth, and enhance your technical skills.",
        type: "Full-time",
        location: "Remote",
        questions: [
            {
                id: "question1",
                title: "Share your academic background and highlight key programming concepts you've mastered. " +
                    "How has your education shaped your current tech skill set ?"
            },
            {
                id: "question2",
                title: "Describe your professional development, emphasizing any certifications obtained. " +
                    "How have these certifications enriched your technical abilities, " +
                    "and can you provide an example of their practical application ?",
            },
            {
                id: "question3",
                title: "Discuss notable projects in your programming experience. What challenges did you face, " +
                    "and how did you apply your skills to overcome them? Highlight the technologies used " +
                    "and the impact of these projects on your overall growth as a professional ?"
            }
        ],
    };

    return (
        <>
            <NavBar title={"Job Form"} icon={<MdFormatAlignRight className="opacity-70" size={30} />} />
            <div className="px-20">

                <h1 className="text-4xl mt-14">{job.title}</h1>
                <div className="flex items-center gap-x-14 mt-5">
                    <div className="flex gap-x-5">
                        <FaBusinessTime size="30" />
                        <h2 className="text-xl">{job.type}</h2>
                    </div>
                    <div className="flex gap-x-4">
                        <FaLocationDot size="25" />
                        <h2 className="text-xl">{job.location}</h2>
                    </div>
                </div>

                <h2 className="text-lg pe-40 mt-8 mb-10">{job.description}</h2>
                <Separator />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-16">
                        <InputItem id="name" inputType="input" title="Full Name"
                                   required={true} register={register} error={errors.name}/>
                    </div>

                    {job.questions.map((question) => (
                        <div className="mt-16" key={question.id}>
                            <InputItem id={question.id} inputType="textArea" title={question.title}
                                       required={true} register={register} error={errors[question.id]}/>
                        </div>
                    ))}

                    <div className="flex gap-x-5 mt-10 ">
                        <Button type="submit" className="text-xl mb-16">Submit</Button>
                    </div>
                </form>
            </div>
        </>
    );
};