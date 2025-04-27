import { Head, Link, usePage } from '@inertiajs/react';

import { Toaster } from '@/components/ui/sonner';
import useErrors from '@/hooks/use-errors';
import { cn } from '@/lib/utils';
import { SearchProps } from '@/types';
import { GalleryVerticalEnd } from 'lucide-react';
import { useState } from 'react';
import SearchContextProvider from './context';
import { ContactInfo } from './modules/ContactInfo';
import { DomainInfo } from './modules/DomainInfo';
import OutputSettings from './modules/OutputSettings';
import SearchBox from './modules/SearchBox';

export default function Search() {
    const {
        domain = '',
        result = undefined,
        animate = false,
        app: { name: appName },
    } = usePage<SearchProps>().props;

    useErrors();

    const [toggleViewState, setToggleViewState] = useState({
        showDomainInfo: true,
        showContactInfo: true,
    });

    const handleOutputSettingsChange = (key: string, value: boolean) => {
        setToggleViewState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <>
            <Head title="Search Domain">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <SearchContextProvider initialValues={{ domain, result }}>
                <div className="flex min-h-screen flex-col p-4">
                    <div
                        className={cn('flex flex-grow flex-col justify-center py-24 lg:py-32', {
                            'animate-slide-up': animate,
                        })}
                    >
                        <div className="mx-auto mt-0 w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                            <div className="mb-4 flex items-center justify-center">
                                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                                    <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
                                        <GalleryVerticalEnd className="size-4" />
                                    </div>
                                    {appName}
                                </Link>
                            </div>
                            <h1 className="text-primary text-3xl font-bold sm:text-4xl">Simple Domain Search</h1>
                            <p className="text-muted-foreground mt-3">Get basic domain information for free!</p>
                        </div>

                        <SearchBox />

                        {result && (
                            <main className="container mx-auto mt-5 max-w-6xl space-y-5 border-t border-slate-100 pt-5 sm:mt-10 dark:border-zinc-900/60">
                                <div className="flex justify-end">
                                    <OutputSettings onChange={handleOutputSettingsChange} />
                                </div>

                                <div className="space-y-10">
                                    {toggleViewState.showDomainInfo && <DomainInfo />}
                                    {toggleViewState.showContactInfo && <ContactInfo />}
                                </div>
                            </main>
                        )}
                    </div>
                    <footer className="mx-auto mt-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-muted-foreground text-xs">
                            &copy; {new Date().getFullYear()} {appName}
                        </p>
                    </footer>
                </div>
            </SearchContextProvider>
            <Toaster />
        </>
    );
}
