'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DisplayOptionsProps, OutputSetting, OutputSettingsOption } from '@/types';
import { Settings2Icon } from 'lucide-react';
import { useState } from 'react';

const outputSettingsOptions: OutputSettingsOption[] = [
    {
        label: 'Show Domain Information',
        key: 'showDomainInfo',
        checked: true,
    },
    {
        label: 'Show Contact Information',
        key: 'showContactInfo',
        checked: true,
    },
];

export default function OutputSettings({ onChange }: DisplayOptionsProps) {
    const [options, setOptions] = useState<OutputSettingsOption[]>(outputSettingsOptions);

    const handleOptionsChange = (key: OutputSetting, checked: boolean) => {
        onChange(key, checked);

        setOptions((prevOptions) => prevOptions.map((option) => (option.key === key ? { ...option, checked } : option)));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                    <Settings2Icon /> View Settings
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                {options.map(({ key, label, checked }) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        checked={checked}
                        onCheckedChange={(checked) => {
                            handleOptionsChange(key, checked);
                        }}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
