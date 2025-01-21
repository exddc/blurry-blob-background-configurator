import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import type { ShareButtonProps } from '@/types/blob-generator';
import { encodeConfig } from '@/lib/url-helpers';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { userAgent } from 'next/server';

export function ShareButton({ config }: ShareButtonProps) {
    const router = useRouter();
    const { toast } = useToast();
    const { device } = userAgent({ headers: new Headers() });
    const isMobile = device?.type === 'mobile';

    const handleShare = async () => {
        const encodedConfig = encodeConfig(config);
        const url = `${window.location.origin}${window.location.pathname}?config=${encodedConfig}`;

        try {
            await navigator.clipboard.writeText(url);
            router.push(`?config=${encodedConfig}`, { scroll: false });
            toast({
                title: 'Link copied!',
                description: 'Share URL has been copied to clipboard',
            });
            // If on mobile device, show alert instead
            if (isMobile) {
                alert('Link copied to clipboard');
            }
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <Button onClick={handleShare} variant="glass-light" className="w-full">
            <Share2 className="w-4 mr-2" />
            Share Configuration
        </Button>
    );
}
