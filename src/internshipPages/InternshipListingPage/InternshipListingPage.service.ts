import axios from 'axios';
import {Internship} from "./InternshipListingPage.types.ts";

const BASE_URL = 'https://example.com/api/internships'; // Replace with your API endpoint

export const getInternships = async (): Promise<Internship[]> => {
    const response = await axios.get<Internship[]>(BASE_URL);
    return response.data;
};
