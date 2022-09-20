import React, { useEffect, useState } from "react";
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { getRandomEmoji } from "../../helpers";
import { ICustomizedIcon, IItem } from "./types";
import { useListItems } from "../../hooks/useListItems";

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
        padding: '0.5rem 0.1rem',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'baseline',
        flexDirection: 'column',
        maxHeight: '15rem',
        height: 'auto',
        overflow: 'auto',
        overflowX: 'hidden'
    },
    hiddenList: {
        display: 'none'
    },
    item: {
        margin: '0.5rem',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        padding: '1rem',
    },
    itemSelected: {
        width: '85%',
        cursor: 'pointer',
        margin: '0.5rem',
        textAlign: 'left',
        background: 'lightblue',
        borderRadius: '2rem',
        padding: '1rem',
    },
    disabled: {
        pointerEvents: 'none'
    },
    '@media (max-width: 768px)': {
        selectParent: {
            width: '60%',
        },
    }
}));


const CustomizedIcon = ({ className, onClick, type }: ICustomizedIcon) => {
    switch (type) {
        case 'open':

            return <RiArrowUpSLine className={className} onClick={onClick} />


        default:
            return <RiArrowDownSLine className={className} onClick={onClick} />
    }
}



const DropDown = () => {
    const [showList, setShowList] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [hoverItem, setHoverItem] = useState<number>();
    const { items, addItems, error } = useListItems([])
    const classes = useStyles();


    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputValue) {
            addItems({
                title: inputValue,
                emoji: getRandomEmoji(),
                id: new Date().getTime()
            });
            setInputValue('')
        }
    }

    const handleClickItem = (title: string, id: number) => () => {
        setHoverItem(id)
        setInputValue(title)
    }

    const handleChangeInput = (event: React.BaseSyntheticEvent) => setInputValue(event.target.value)

    const handleClickIcon = () => setShowList(!showList)


    useEffect(() => {

        if (error) {
            toast.error("Duplicate Item is not allowed")
        }
    }, [error])


    return (
        <>
            <div className={classes.selectParent}>
                <input className={classes.inputSelect}
                    onChange={handleChangeInput}
                    onKeyDown={handleKeyDown} value={inputValue}
                    placeholder='Type something and then press Enter' />

                <CustomizedIcon className={cx(classes.inputIcon, {
                    [classes.disabled]: !items || !items.length
                })}
                    type={showList ? "open" : "close"}
                    onClick={handleClickIcon}
                />
                <div className={showList ? classes.showList : classes.hiddenList}>
                    {items.map((item: IItem) => (
                        <p key={item.id}
                            className={cx(classes.item, { [classes.itemSelected]: hoverItem === item.id })}
                            onClick={handleClickItem(item.title, item.id)}>{`${item.title}  ${item.emoji}`}</p>
                    ))}
                </div>
            </div>
            <Toaster position="bottom-center"
                toastOptions={{
                    duration: 2000
                }} />

        </>

    )

}



export default DropDown;