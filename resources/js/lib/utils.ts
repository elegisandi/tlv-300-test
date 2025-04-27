import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function numberFormat(number: number) {
    return new Intl.NumberFormat('en-US').format(number);
}
