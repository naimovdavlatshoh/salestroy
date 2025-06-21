// components/ui/password-input.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // yoki react-icons/fi dan ham foydalansa bo‘ladi
import { cn } from "@/lib/utils";

interface PasswordInputProps {
    label?: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

export function PasswordInput({
    label = "Password",
    name = "password",
    value,
    onChange,
    required = true,
    placeholder,
    className,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cn("grid gap-3 relative", className)}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
                required={required}
                name={name}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700"
            >
                {showPassword ? (
                    <EyeOffIcon size={18} />
                ) : (
                    <EyeIcon size={18} />
                )}
            </button>
        </div>
    );
}
