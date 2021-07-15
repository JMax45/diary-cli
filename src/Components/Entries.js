import SelectInput from "ink-select-input";
import React, { useContext, useState } from "react";
import { PageContext } from "./PageContext";
import { StorageContext } from "../Storage";
import SingleEntry from "./SingleEntry";
import { Box, Newline, Text, useInput } from "ink";
import Main from './Main';
import Search from "./Search";

const Entries = ({ customEntries }) => {
    const [page, setPage] = useContext(PageContext).page;
    const storage = useContext(StorageContext).storage;
    const toMap = customEntries || storage.diary;
    let items = customEntries;
    if(customEntries === undefined) {
        const [itemState] = useState(toMap.map(e => ({ 
            label: `${e.date} | ${e.text.substring(0, 30)}...`, 
            value: e.id 
        })));
        items = itemState;
    }
    useInput((input, key) => {
        if(!key.ctrl) {
            return;
        }
        switch(input.toLowerCase()) {
            case 'q':
                setPage(<Main />);
                break;
            case 's':
                setPage(<Search />);
                break;
        }
	});
    return <>
        <SelectInput items={items} onSelect={(item) => { setPage(<SingleEntry entryId={item.value} />) }} />
        <Newline />
        <Box>
            <Text backgroundColor="white" color="black">^Q</Text>
            <Text> Home</Text>
            <Text>  </Text>
            <Text backgroundColor="white" color="black">^S</Text>
            <Text> Search</Text>
        </Box>
    </>
}

export default Entries;