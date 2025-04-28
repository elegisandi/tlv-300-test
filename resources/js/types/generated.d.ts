declare namespace App.Data {
    export type DomainResult = {
        domainName: string;
        domainRegistrarName: string;
        domainCreatedDate: string;
        domainExpiresDate: string;
        domainEstimatedAge: number;
        domainHostNames: Array<string> | null;
        contactRegistrantName: string | null;
        contactTechnicalName: string | null;
        contactAdministrativeName: string | null;
        contactEmail: string | null;
    };
}
