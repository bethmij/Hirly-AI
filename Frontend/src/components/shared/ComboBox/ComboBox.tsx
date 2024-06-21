import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";

interface ComboBoxProps {
    statuses: string[]
    required: boolean
}

export function ComboBoxItem(props: ComboBoxProps) {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
    // const [selectedOption, setSelectedOption] = useState("");


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start hover:bg-transparent">
                    {selectedStatus ? <>{selectedStatus}</> :
                        <span className="opacity-50">select</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} props={props}
                            selectedStatus={selectedStatus}/>
            </PopoverContent>
        </Popover>
    )
}

function StatusList({
                        setOpen,
                        setSelectedStatus,
                        props,
                        selectedStatus
                    }: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: string | null) => void
    props: ComboBoxProps
    selectedStatus:string | null

}) {
    return (
        <Command onValueChange={value => setSelectedStatus(value)} value={selectedStatus || ""} >
            <CommandInput placeholder="search"/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {props.statuses.map((status) => (
                        <CommandItem
                            key={status}
                            value={status}
                            onSelect={(value) => {
                                setSelectedStatus(
                                    props.statuses.find((priority) => priority === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {status}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
