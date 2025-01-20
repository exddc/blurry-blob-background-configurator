import type { BlobConfig } from '@/types/blob-generator';
import { distributeColors } from '@/lib/color-utils';

export function BlobPreview({ config }: { config: BlobConfig }) {
    const colors = config.randomizeColors
        ? distributeColors(config.colors, config.numBlobs)
        : config.colors;

    const getGradient = (startColor: string, endColor: string) => {
        switch (config.gradientType) {
            case 'linear':
                return `linear-gradient(45deg, ${startColor} 0%, ${endColor} 100%)`;
            case 'radial':
                return `radial-gradient(circle at 50% 50%, ${startColor} 0%, ${endColor} 100%)`;
            case 'conic':
            default:
                return `conic-gradient(from 90deg at 50% 50%, ${startColor} 0%, ${endColor} 100%)`;
        }
    };

    const generateBlobStyles = () => {
        return Array.from({ length: config.numBlobs }).map((_, i) => (
            <div
                key={i}
                style={{
                    background: getGradient(
                        colors[i * 2] || colors[0],
                        colors[i * 2 + 1] || colors[1]
                    ),
                    width: `${config.size}px`,
                    height: '100%',
                    marginLeft: i === 0 ? 0 : `-${config.distance}px`,
                    animation: `spin ${
                        config.speed * (i + 1)
                    }s linear infinite`,
                }}
            />
        ));
    };

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <div className="relative w-full">
                <div
                    className="flex justify-center"
                    style={{
                        height: `${config.height}px`,
                        filter: `blur(${config.blur}px)`,
                    }}
                >
                    {generateBlobStyles()}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-semibold text-center tracking-tight z-10 px-4">
                        {config.heading}
                    </h1>
                </div>
            </div>
        </div>
    );
}
