import { Loader2, type LucideIcon } from 'lucide-react'

interface ButtonProps {
    type?: 'submit' | 'button' | 'reset';
    text: string;
    icon?: LucideIcon;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}

const variantStyles = {
    primary:   'bg-accent text-foreground border-2 border-accent shadow-accent hover:shadow-xs active:shadow-none',
    secondary: 'bg-transparent text-foreground border-2 border-foreground before:absolute before:inset-0 before:bg-foreground before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:text-background',
};

const Button = ({ type = 'button', text, icon: Icon, variant = 'primary', onClick, disabled, isLoading, loadingText }: ButtonProps) => {
    return(
        <button type={type} onClick={onClick} disabled={disabled || isLoading}
                className={`relative overflow-hidden uppercase py-2 px-4 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 ${variantStyles[variant]}`}>
                <span className="relative z-10 inline-flex items-center gap-2">
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : Icon && <Icon size={16} />}
                    {isLoading ? (loadingText ?? text) : text}
                </span>
        </button>
    );
}

export default Button