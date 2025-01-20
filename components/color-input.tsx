import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ColorInputProps {
    value: string;
    onChange: (value: string) => void;
    onRemove?: () => void;
    showRemove?: boolean;
}

export function ColorInput({
    value,
    onChange,
    onRemove,
    showRemove = true,
}: ColorInputProps) {
    const [hexValue, setHexValue] = useState(value);

    useEffect(() => {
        setHexValue(value);
    }, [value]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setHexValue(newValue);
        if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex gap-2">
            <div className="flex-1 flex gap-2">
                <Input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-[60px] h-10 p-1 bg-white/80 border-black/10"
                />
                <Input
                    type="text"
                    value={hexValue}
                    onChange={handleHexChange}
                    placeholder="#000000"
                    className="flex-1 bg-white/80 border-black/10 text-black/80 placeholder:text-black/40"
                    maxLength={7}
                />
            </div>
            {showRemove && onRemove && (
                <Button
                    variant="glass-light"
                    size="icon"
                    onClick={onRemove}
                    className="shrink-0"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
