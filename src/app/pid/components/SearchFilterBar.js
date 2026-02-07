'use client';

import { useState } from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';

export function useSearchAndSort(initialItems, defaultSort = 'newest') {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState(defaultSort);

    // Filter logic remains the same (smart numeric sort)
    const filteredItems = initialItems.filter(item => { // Quick filter for memo check, actual memo in real app
        if (!searchTerm) return true;
        const lowerTerm = searchTerm.toLowerCase();
        return (
            (item.name && item.name.toLowerCase().includes(lowerTerm)) ||
            (item.revA && item.revA.toLowerCase().includes(lowerTerm)) ||
            (item.revB && item.revB.toLowerCase().includes(lowerTerm))
        );
    }).sort((a, b) => {
        const cleanName = (str) => str ? str.replace(/\.[^/.]+$/, "") : '';
        let valA = cleanName(a.name);
        let valB = cleanName(b.name);

        // Smart numeric sort helper
        const smartSort = (strA, strB) => {
            return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
        };

        const dateA = a.createdTime ? new Date(a.createdTime).getTime() : 0;
        const dateB = b.createdTime ? new Date(b.createdTime).getTime() : 0;

        switch (sortOption) {
            case 'a-z': return smartSort(valA, valB);
            case 'z-a': return smartSort(valB, valA);
            case 'newest':
                if (dateA && dateB && dateA !== dateB) return dateB - dateA;
                return smartSort(valB, valA); // Numeric Desc
            case 'oldest':
                if (dateA && dateB && dateA !== dateB) return dateA - dateB;
                return smartSort(valA, valB); // Numeric Asc
            default: return 0;
        }
    });

    return { searchTerm, setSearchTerm, sortOption, setSortOption, filteredItems };
}

export default function SearchFilterBar({ searchTerm, setSearchTerm, sortOption, setSortOption, placeholder = "Search..." }) {
    const [showSortMenu, setShowSortMenu] = useState(false);

    const sortLabels = {
        'newest': 'Newest',
        'oldest': 'Oldest',
        'a-z': 'Name (A-Z)',
        'z-a': 'Name (Z-A)'
    };

    return (
        <div className="pid-search-filter">
            {/* Search Bar */}
            <div className="pid-search-input-wrap">
                <Search className="pid-search-icon" size={22} strokeWidth={2.5} />
                <input
                    type="text"
                    className="pid-search-input"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="pid-search-clear"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Sort Controls */}
            <div className="pid-sort-wrap">
                <button
                    type="button"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="pid-sort-btn"
                >
                    <div className="pid-sort-text">
                        <span className="pid-sort-label">Sort By</span>
                        <span className="pid-sort-value">
                            {sortLabels[sortOption]}
                        </span>
                    </div>
                    <div className="pid-sort-icon">
                        <ArrowUpDown className="pid-sort-icon-svg" size={20} strokeWidth={2} />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {showSortMenu && (
                    <>
                        <div className="pid-sort-backdrop" onClick={() => setShowSortMenu(false)}></div>
                        <div className="pid-sort-menu">
                            {Object.keys(sortLabels).map(key => (
                                <button
                                    key={key}
                                    type="button"
                                    className={`pid-sort-option ${sortOption === key ? 'pid-sort-option-active' : ''}`}
                                    onClick={() => { setSortOption(key); setShowSortMenu(false); }}
                                >
                                    {sortLabels[key]}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
