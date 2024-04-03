import {useState} from "react";
import { useCallback } from "react";
import axios from "axios";
import styles from "./Searchbar.module.css";
import AutoComplete from "../AutoComplete/AutoComplete.jsx";

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count',
};

function SearchBar({ setBusinesses }) {
    const [sortBy, setSortBy] = useState('best_match');
    const [searchBusiness, setSearchBusiness] = useState('');
    const [searchWhere, setSearchWhere] = useState('');

    const fetchBusinesses = useCallback(async () => {
        try {
            const url = '/search';
            const params = {
                term: searchBusiness,
                location: searchWhere,
                sort_by: sortBy,
            };

            const response = await axios.get(url, { params });
            setBusinesses(response.data.businesses);

        } catch (error) {
            console.error('There was an error fetching data from Yelp API', error);
        }
    }, [searchBusiness, searchWhere, sortBy, setBusinesses]);

    const renderSortByOptions = () => {
        return Object.entries(sortByOptions).map(([text, value]) => {
            // Überprüfen, ob die aktuelle Option die ausgewählte ist
            const isActive = sortBy === value;

            return (
                <li
                    className={`${styles.sortByItem} ${isActive ? styles.activeSortByItem : ''}`}
                    key={value}
                    onClick={() => setSortBy(value)}
                >
                    {text}
                </li>
            );
        });
    };

    return (
        <div className={styles.searchBarContainer}>
            <ul className={styles.sortByList}>{renderSortByOptions()}</ul>
            <div className={styles.inputGroup}>
                <AutoComplete setSearchBusiness={setSearchBusiness} />
                <input
                    placeholder='Where?'
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                />
            </div>
            <div>
                <button className={styles.button} onClick={fetchBusinesses}>
                    Let's Go
                </button>
            </div>
        </div>
    );
}

export default SearchBar;