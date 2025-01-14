
export interface Internship {
    id: number;
    organization: Organization;
    name: string;
    technology: string;
    description: string;
    location: string;
    paid: boolean;
    minimumPay: number;
    maximumPay: number;
    durationInMonths: number;
    numberOfOpenings: number;
    startDate: Date;
}

export interface Organization {
    id: number;
    firstName: string;
}

export interface InternshipListingPageProps {
    internships: Internship[];
}
