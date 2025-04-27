import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSearchContext } from '../context';

export function ContactInfo() {
    const { result } = useSearchContext();

    if (!result) {
        return null;
    }

    const { contactRegistrantName, contactAdministrativeName, contactTechnicalName, contactEmail } = result;

    return (
        <div className="animate-fade-in space-y-2 transition-all">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registrant Name</TableHead>
                            <TableHead>Technical Contact Name</TableHead>
                            <TableHead>Administrative Contact Name</TableHead>
                            <TableHead>Contact Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{contactRegistrantName || 'N/A'}</TableCell>
                            <TableCell>{contactTechnicalName || 'N/A'}</TableCell>
                            <TableCell>{contactAdministrativeName || 'N/A'}</TableCell>
                            <TableCell>{contactEmail || 'N/A'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
