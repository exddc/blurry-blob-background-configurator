import { BlobGenerator } from '@/components/blob-generator';
import Loading from './loading';
import { Suspense } from 'react';
import Link from 'next/link';

export default function Page() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <BlobGenerator />
            </Suspense>
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
