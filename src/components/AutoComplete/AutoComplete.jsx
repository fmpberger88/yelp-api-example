import { useState } from "react";
import axios from "axios";
import styles from "./AutoComplete.module.css"

function AutoComplete( { setSearchBusiness }) {
    const [autoCompleteResults, setAutoCompleteResults] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fetchAutoCompleteResults = async (text) => {
        const url = '/autocomplete';
        const params = { text };

        try {
            const response = await  axios.get(url, { params })
            setAutoCompleteResults(response.data.terms.map(term => term.text));
        } catch (error) {
            console.error('Error fetching autocomplete results: ', error);
        }
    };

    return (
        <div className={styles.autocompleteContainer}>
            <input
                placeholder='Search Business'
                value={inputValue}
                onChange={(e) => {
                    const query = e.target.value;
                    setInputValue(query);
                    fetchAutoCompleteResults(query);
                }}
            />
            {autoCompleteResults.length > 0 && (
                <ul className={styles.dropdownList}>
                    {autoCompleteResults.map((result, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setInputValue(result)
                                setSearchBusiness(result);
                                setAutoCompleteResults([]) // clear the list after selection
                            }}
                            className={styles.dropdownItem}
                        >
                            {result}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AutoComplete;