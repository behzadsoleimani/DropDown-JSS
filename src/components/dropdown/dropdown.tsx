import React, { useState } from "react";
import { createUseStyles } from 'react-jss';
import { RiArrowDownSLine } from 'react-icons/ri'
import { getRandomEmoji } from "../../helpers";
import { IItem } from "./types";


const useStyles = createUseStyles(({
    selectParent: {
        margin: '2rem auto',
        position: 'relative',
        width: '20rem',
    },
    inputSelect: {
        padding: '0.5rem 0.2rem',
        borderRadius: '1rem',
        width: '100%',
        boxShadow: '0 0 0 1pt grey',
        border: 'none',
        outline: 'none',
        '&:focus': {
            border: '0.1rem solid lightblue',
        }
    },
    inputIcon: {
        top: '30%',
        right: '2%',
        position: 'absolute',
        cursor: 'pointer',
    },

    showList: {
        position: 'absolute',
        marginTop: '0.2rem',
        border: '1px solid #ddd',
        width: '100%',
        padding: '0.5rem',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'baseline',
        flexDirection: 'column',
        maxHeight: '15rem',
        height: 'auto',
        overflow: 'auto'
    },
    hiddenList: {
        display: 'none'
    },
    item: {
        padding: '0 0.2rem',
        cursor: 'pointer'
    },
    '@media (max-width: 768px)': {
        selectParent: {
            width: '60%',
        },
    }
}));



const DropDown = () => {
    const [showList, setShowList] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [items, setItems] = useState<IItem[]>([]);
    const classes = useStyles();



    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputValue) {
            setItems([...items, {
                title: inputValue,
                emoji : getRandomEmoji(),
                id: new Date().getTime()
            }]);
            setInputValue('')
        }
    }


    return (
        <div className={classes.selectParent}>
            <input className={classes.inputSelect}
                onChange={(event: React.BaseSyntheticEvent) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown} value={inputValue} />
            <RiArrowDownSLine className={classes.inputIcon}
                onClick={() => setShowList(!showList)} />

            <div className={showList ? classes.showList : classes.hiddenList}>
                {items.map((item: IItem) => (
                    <p key={item.id}
                        className={classes.item}
                        onClick={() => setInputValue(item.title)}>{`${item.title}  ${item.emoji}`}</p>
                ))}
            </div>
        </div>
    )

}



export default DropDown;