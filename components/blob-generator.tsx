'use client';

import { useEffect, useState } from 'react';
import { BlobPreview } from '@/components/blob-preview';
import { ControlPanel } from '@/components/control-panel';
import { Toaster } from '@/components/ui/toaster';
import type { BlobConfig } from '@/types/blob-generator';
import { decodeConfig, getDefaultConfig } from '@/lib/url-helpers';
import { useSearchParams } from 'next/navigation';

export function BlobGenerator() {
    const [config, setConfig] = useState<BlobConfig>({
        ...getDefaultConfig(),
        randomizeColors: false,
    });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const configParam = searchParams.get('config');
        if (configParam) {
            try {
                const decodedConfig = decodeConfig(configParam);
                setConfig(decodedConfig);
            } catch (error) {
                console.error('Failed to decode config:', error);
            }
        }
    }, [searchParams]);

    return (
        <div className="flex h-screen overflow-hidden">
            <div
                className="flex-1 overflow-hidden"
                style={{ backgroundColor: config.backgroundColor }}
            >
                <BlobPreview config={config} />
            </div>

            <div className="border-l">
                <ControlPanel
                    config={config}
                    onConfigChange={setConfig}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
            <Toaster />
        </div>
    );
}
