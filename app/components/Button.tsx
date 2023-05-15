import { IconType } from "react-icons/lib";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}
const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
    return ( 
        <button className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-90
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1 font-light text-sm border-[1px]' : 'py-3 font-semibold text-md border-2'}
        `}>
            {Icon && <Icon className="absolute left-4 top-3" size="24" />}
            {label}
        </button>
     );
}
 
export default Button;