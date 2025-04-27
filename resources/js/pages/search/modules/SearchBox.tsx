import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';
import { useSearchContext } from '../context';

export default function SearchBox() {
    const { domain } = useSearchContext();

    const { data, setData, get, processing } = useForm({
        domain,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        get(route('search'));
    };

    return (
        <div className="mx-auto mt-10 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="relative w-full">
                    <SearchIcon size={16} className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2" />
                    <Input
                        type="text"
                        value={data.domain}
                        onChange={(e) => setData('domain', e.target.value)}
                        className="block w-full rounded-lg p-5 pl-10"
                        placeholder="example.com"
                        required
                    />
                </div>
                <Button className="w-full cursor-pointer p-5 sm:w-60" size="lg" disabled={processing}>
                    {processing && <LoaderCircleIcon className="animate-spin" />}
                    Search
                </Button>
            </form>
        </div>
    );
}
