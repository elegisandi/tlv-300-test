import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function useErrors() {
    const {
        errors,
        flash: { success, error },
    } = usePage<SharedData>().props;

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
        }

        if (success) {
            toast.success(success);
        }

        if (error) {
            toast.error(error);
        }
    }, [errors, success, error]);
}
