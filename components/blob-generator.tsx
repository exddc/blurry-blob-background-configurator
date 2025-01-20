'use client';

import { useEffect, useState } from 'react';
import { BlobPreview } from '@/components/blob-preview';
import { ControlPanel } from '@/components/control-panel';
import { Toaster } from '@/components/ui/toaster';
import type { BlobConfig } from '@/types/blob-generator';
import { decodeConfig, getDefaultConfig } from '@/lib/url-helpers';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
            <div className="fixed left-4 bottom-4 flex flex-col">
                <Link
                    href="https://timoweiss.me"
                    className="text-xs font-medium text-black/80 hover:underline"
                >
                    Built by Timo Weiss
                </Link>
                <Link
                    href="https://gotdoneapp.com"
                    className="text-xs font-medium text-black/80 hover:underline"
                >
                    Also check out GotDone
                </Link>
            </div>
        </div>
    );
}
