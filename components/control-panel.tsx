import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Copy, Plus } from 'lucide-react';
import { generateRandomColor } from '@/lib/color-utils';
import type { ControlPanelProps, GradientType } from '@/types/blob-generator';
import { ControlSlider } from './control-slider';
import { ShareButton } from './share-button';
import { ColorInput } from './color-input';
import { generateCode } from '@/lib/code-generator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';

export function ControlPanel({
    config,
    onConfigChange,
    isCollapsed,
    onToggleCollapse,
}: ControlPanelProps) {
    const { toast } = useToast();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generateCode(config));
            toast({
                title: 'Copied!',
                description: 'Code has been copied to clipboard',
            });
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const addColor = () => {
        onConfigChange({
            ...config,
            colors: [...config.colors, generateRandomColor()],
        });
    };

    const removeColor = (index: number) => {
        if (config.colors.length <= 2) return;
        const newColors = config.colors.filter((_, i) => i !== index);
        onConfigChange({ ...config, colors: newColors });
    };

    return (
        <div className="fixed right-4 top-4 bottom-4 flex items-center z-10">
            <AnimatePresence initial={false}>
                {isCollapsed ? (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Button
                            variant="glass-light"
                            className="h-20 px-2 "
                            onClick={onToggleCollapse}
                            aria-label="Expand settings panel"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="expanded"
                        className="fixed right-4 top-4 bottom-4 w-80 overflow-hidden flex flex-col rounded-xl border border-black/10 bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-2xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-neutral-100">
                            <h2 className="text-lg font-semibold text-black/80">
                                Settings
                            </h2>

                            <Button
                                variant="glass-light"
                                size="icon"
                                onClick={onToggleCollapse}
                                aria-label="Collapse settings panel"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto border-b border-neutral-100">
                            <div className="p-4 space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-black/60">
                                        Heading Text
                                    </Label>
                                    <Input
                                        value={config.heading}
                                        onChange={(e) =>
                                            onConfigChange({
                                                ...config,
                                                heading: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your heading"
                                        className="bg-white/80 border-black/10 text-black/80 placeholder:text-black/40"
                                    />
                                </div>

                                <ControlSlider
                                    label="Number of Blobs"
                                    value={config.numBlobs}
                                    onChange={(value) =>
                                        onConfigChange({
                                            ...config,
                                            numBlobs: value,
                                        })
                                    }
                                    min={1}
                                    max={4}
                                    step={1}
                                />

                                <ControlSlider
                                    label="Blur Intensity"
                                    value={config.blur}
                                    onChange={(value) =>
                                        onConfigChange({
                                            ...config,
                                            blur: value,
                                        })
                                    }
                                    min={0}
                                    max={200}
                                    step={1}
                                    unit="px"
                                />

                                <ControlSlider
                                    label="Blob Size"
                                    value={config.size}
                                    onChange={(value) =>
                                        onConfigChange({
                                            ...config,
                                            size: value,
                                        })
                                    }
                                    min={100}
                                    max={500}
                                    step={10}
                                    unit="px"
                                />

                                <ControlSlider
                                    label="Blob Height"
                                    value={config.height}
                                    onChange={(value) =>
                                        onConfigChange({
                                            ...config,
                                            height: value,
                                        })
                                    }
                                    min={100}
                                    max={500}
                                    step={10}
                                    unit="px"
                                />

                                <ControlSlider
                                    label="Blob Distance"
                                    value={config.distance}
                                    onChange={(value) =>
                                        onConfigChange({
                                            ...config,
                                            distance: value,
                                        })
                                    }
                                    min={0}
                                    max={300}
                                    step={5}
                                    unit="px"
                                />

                                <ControlSlider
                                    label="Animation Speed"
                                    value={config.speed}
                                    onChange={(value) =>
                                        onConfigChange({
                                            ...config,
                                            speed: value,
                                        })
                                    }
                                    min={1}
                                    max={20}
                                    step={1}
                                    unit="s"
                                />

                                <div className="space-y-4">
                                    <Label className="text-black/60">
                                        Gradient Type
                                    </Label>
                                    <Select
                                        value={config.gradientType}
                                        onValueChange={(value: GradientType) =>
                                            onConfigChange({
                                                ...config,
                                                gradientType: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="bg-white/80 border-black/10 text-black/80">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white/80 border-white/40 backdrop-blur-xl">
                                            <SelectItem
                                                value="conic"
                                                className="focus:bg-black/10"
                                            >
                                                Conic
                                            </SelectItem>
                                            <SelectItem
                                                value="linear"
                                                className="focus:bg-black/10"
                                            >
                                                Linear
                                            </SelectItem>
                                            <SelectItem
                                                value="radial"
                                                className="focus:bg-black/10"
                                            >
                                                Radial
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-black/60">
                                        Background Color
                                    </Label>
                                    <ColorInput
                                        value={config.backgroundColor}
                                        onChange={(value) =>
                                            onConfigChange({
                                                ...config,
                                                backgroundColor: value,
                                            })
                                        }
                                        showRemove={false}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-black/60">
                                            Blob Colors
                                        </Label>
                                        <Button
                                            variant="glass-light"
                                            size="sm"
                                            onClick={addColor}
                                            className="h-8"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Add Color
                                        </Button>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="randomize"
                                            checked={config.randomizeColors}
                                            onCheckedChange={(checked) =>
                                                onConfigChange({
                                                    ...config,
                                                    randomizeColors:
                                                        checked === true,
                                                })
                                            }
                                            className="border-black/20 data-[state=checked]:bg-black/20 data-[state=checked]:border-black/20"
                                        />
                                        <label
                                            htmlFor="randomize"
                                            className="text-sm font-medium text-black/60 leading-none"
                                        >
                                            Randomize color distribution
                                        </label>
                                    </div>
                                    <div className="space-y-2">
                                        {config.colors.map((color, i) => (
                                            <ColorInput
                                                key={i}
                                                value={color}
                                                onChange={(value) => {
                                                    const newColors = [
                                                        ...config.colors,
                                                    ];
                                                    newColors[i] = value;
                                                    onConfigChange({
                                                        ...config,
                                                        colors: newColors,
                                                    });
                                                }}
                                                onRemove={() => removeColor(i)}
                                                showRemove={
                                                    config.colors.length > 2
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/40">
                            <div className="space-y-2">
                                <Button
                                    onClick={copyToClipboard}
                                    variant="glass-light"
                                    className="w-full"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Code
                                </Button>
                                <ShareButton config={config} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
