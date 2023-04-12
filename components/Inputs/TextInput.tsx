import { FormEvent } from "react";

interface ITextInput {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (event: FormEvent<HTMLInputElement>) => void;
}
  
const TextInput: React.FC<ITextInput> = ({id, label, onChange, type}) => {
    return (
        <div className="relative mt-4">
            <input type={type} id={id} className="block px-6 pt-6 pb-2 text-md rounded-md w-full mt-2 bg-neutral-700  appearance-none focus:outline-none focus:ring-0 peer text-white" placeholder=" "  onChange={onChange}/>
            <label htmlFor={id} className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                {label}
            </label>
        </div>
    )
}

export default TextInput;