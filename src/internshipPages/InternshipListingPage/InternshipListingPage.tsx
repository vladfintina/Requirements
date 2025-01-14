import React, { useState, useEffect } from 'react';
import { getInternships } from './internship.service';
import { Internship } from './internship.model';

const InternshipListingPage: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        paid: false,
        minimumPay: 0,
    });

    useEffect(() => {
        const fetchInternships = async () => {
            const data = await getInternships();
            setInternships(data);
            setFilteredInternships(data);

            // Extract unique technologies and locations
            const techs = Array.from(new Set(data.flatMap((i) => i.technology)));
            const locs = Array.from(new Set(data.map((i) => i.location)));
            setTechnologies(techs);
            setLocations(locs);
        };

        fetchInternships();
    }, []);

    const applyFilters = () => {
        const filtered = internships.filter((internship) => {
            const matchesTechnology = filters.technology
                ? internship.technology.includes(filters.technology)
                : true;
            const matchesLocation = filters.location ? internship.location === filters.location : true;
            const matchesPaid = filters.paid ? internship.paid : true;
            const matchesPay = filters.minimumPay
                ? internship.minimumPay >= filters.minimumPay
                : true;
            return matchesTechnology && matchesLocation && matchesPaid && matchesPay;
        });

        setFilteredInternships(filtered);
    };

    // Update filter state and reapply filters
    const handleFilterChange = (key: string, value: any) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
        setTimeout(() => applyFilters(), 0); // Slight delay to ensure state update
    };

    return (
        <div>
            <div className="filters">
                <h3>Filters</h3>
                <label>
                    Technology:
                    <select
                        value={filters.technology}
                        onChange={(e) => handleFilterChange('technology', e.target.value)}
                    >
                        <option value="">All</option>
                        {technologies.map((tech) => (
                            <option key={tech} value={tech}>
                                {tech}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Location:
                    <select
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                        <option value="">All</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Paid Only:
                    <input
                        type="checkbox"
                        checked={filters.paid}
                        onChange={(e) => handleFilterChange('paid', e.target.checked)}
                    />
                </label>

                <label>
                    Minimum Pay:
                    <input
                        type="number"
                        value={filters.minimumPay}
                        onChange={(e) => handleFilterChange('minimumPay', Number(e.target.value))}
                    />
                </label>
            </div>

            <div className="internships">
                <h3>Internship Offerings</h3>
                {filteredInternships.map((internship) => (
                    <div key={internship.id} className="internship-card">
                        <h4>{internship.title}</h4>
                        <p>{internship.description}</p>
                        <p><strong>Technologies:</strong> {internship.technology.join(', ')}</p>
                        <p><strong>Location:</strong> {internship.location}</p>
                        <p><strong>Paid:</strong> {internship.paid ? 'Yes' : 'No'}</p>
                        <p><strong>Minimum Pay:</strong> {internship.minimumPay}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InternshipListingPage;
