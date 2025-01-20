//import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { NumberInput } from '@/components/number-input';
//import { Input } from '@/components/ui/input';
import type { ControlSliderProps } from '@/types/blob-generator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
    Button,
    Group,
    Input,
    Label,
    NumberField,
} from 'react-aria-components';

export function ControlSlider({
    label,
    value,
    onChange,
    min,
    max,
    step,
    unit = '',
}: ControlSliderProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Label className="text-sm font-medium text-foreground w-full">
                    {label}
                </Label>

                <NumberField
                    value={value}
                    onChange={onChange}
                    minValue={min}
                    maxValue={max}
                    step={step}
                >
                    <div className="space-y-2">
                        <Group className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                            <Input className="bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none w-full" />
                            <span className="text-muted-foreground/80 text-sm px-3">
                                {unit}
                            </span>
                            <div className="flex h-[calc(100%+2px)] flex-col">
                                <Button
                                    slot="increment"
                                    className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <ChevronUp
                                        size={12}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </Button>
                                <Button
                                    slot="decrement"
                                    className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <ChevronDown
                                        size={12}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </Button>
                            </div>
                        </Group>
                    </div>
                </NumberField>
            </div>
            <Slider
                value={[value]}
                onValueChange={([newValue]) => onChange(newValue)}
                min={min}
                max={max}
                step={step}
                className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-black/40 [&_[role=slider]]:shadow-sm [&_[role=slider]]:hover:bg-white"
            />
        </div>
    );
}
