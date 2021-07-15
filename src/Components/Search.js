import { Newline, Text, useInput } from 'ink';
import React, { useCallback, useContext, useState } from 'react';
import MiniSearch from 'minisearch'
import { StorageContext } from '../Storage';
import Entries from './Entries';

const Search = () => {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');
    const storage = useContext(StorageContext).storage;
    const search = useCallback((text) => {
        let found = [];
        if(text.trim() === '') {
            found = storage.diary;
        } else {
            let miniSearch = new MiniSearch({
                fields: ['text', 'date']
            })
            miniSearch.addAll(storage.diary);
            let results = miniSearch.search(text);
            found = storage.diary.filter(e => results.map(e => e.id).includes(e.id));
        }
        setItems(found.map(e => ({ 
            label: `${e.date} | ${e.text.substring(0, 30)}...`, 
            value: e.id 
        })));
    }, [items])
    const handleInput = useCallback((text) => {
        setQuery(query+text);
        search(query+text);
    }, [query, items])
    const deleteChar = useCallback(() => {
        setQuery(query.slice(0, -1));
        search(query.slice(0, -1));
    }, [query])
    useInput((input, key) => {
        switch(true) {
            case key.upArrow || key.downArrow:
                break;
            case key.delete:
                deleteChar();
                break;
            default:
                handleInput(input);
                break;
        }
	});
    return (
        <>
            <Text color="blue">Search: {query}</Text>
            <Newline />
            <Entries customEntries={items} />
        </>
    )
}

export default Search;