import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { numberFormat } from '@/lib/utils';
import { useSearchContext } from '../context';

const formatDomainHostNames = (domainHostNames: string[] | null) => {
    if (!domainHostNames || domainHostNames.length === 0) {
        return 'N/A';
    }

    const joinedHostNames = domainHostNames.join(', ');

    let parsed = joinedHostNames.substring(0, 25);

    if (joinedHostNames.length > 25) {
        parsed += '...';
    }

    return parsed;
};

export function DomainInfo() {
    const { result } = useSearchContext();

    if (!result) {
        return null;
    }

    const { domainName, domainRegistrarName, domainCreatedDate, domainExpiresDate, domainEstimatedAge, domainHostNames } = result;

    const formattedEstimatedDomainAge = `${numberFormat(domainEstimatedAge as number)} Days`;
    const formattedDomainHostNames = formatDomainHostNames(domainHostNames);

    return (
        <div className="animate-fade-in space-y-2 transition-all">
            <h2 className="text-lg font-semibold">Domain Information</h2>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Domain Name</TableHead>
                            <TableHead>Registrar</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead>Expiration Date</TableHead>
                            <TableHead>Estimated Domain Age</TableHead>
                            <TableHead>Hostnames</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Badge variant="secondary">{domainName}</Badge>
                            </TableCell>
                            <TableCell>{domainRegistrarName}</TableCell>
                            <TableCell>{domainCreatedDate}</TableCell>
                            <TableCell>{domainExpiresDate}</TableCell>
                            <TableCell>{formattedEstimatedDomainAge}</TableCell>
                            <TableCell>
                                {domainHostNames ? (
                                    <HoverCard>
                                        <HoverCardTrigger className="cursor-help">{formattedDomainHostNames}</HoverCardTrigger>
                                        <HoverCardContent className="w-auto text-sm">
                                            <ul>
                                                {domainHostNames.map((hostName, index) => (
                                                    <li key={index}>{hostName}</li>
                                                ))}
                                            </ul>
                                        </HoverCardContent>
                                    </HoverCard>
                                ) : (
                                    formattedDomainHostNames
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
