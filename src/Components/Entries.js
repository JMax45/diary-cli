import SelectInput from "ink-select-input";
import React, { useContext, useState } from "react";
import { PageContext } from "./PageContext";
import { StorageContext } from "../Storage";
import SingleEntry from "./SingleEntry";
import { Box, Newline, Text, useInput } from "ink";
import Main from './Main';

const Entries = () => {
    const [page, setPage] = useContext(PageContext).page;
    const storage = useContext(StorageContext).storage;
    const [items, setItems] = useState(storage.diary.map(e => ({ 
        label: `${e.date} | ${e.text.substring(0, 30)}...`, 
        value: e.id 
    })));
    useInput((input, key) => {
        if(!key.ctrl) {
            return;
        }
        switch(input.toLowerCase()) {
            case 'q':
                setPage(<Main />);
                break;
        }
	});
    return <>
        <SelectInput items={items} onSelect={(item) => { setPage(<SingleEntry entryId={item.value} />) }} />
        <Newline />
        <Box>
            <Text backgroundColor="white" color="black">^Q</Text>
            <Text> Home</Text>
        </Box>
    </>
}

export default Entries;