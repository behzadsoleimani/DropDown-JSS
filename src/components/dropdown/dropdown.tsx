import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { getRandomEmoji } from "../../helpers";
import { ICustomizedIcon, IItem } from "./types";
import { useListItems } from "../../hooks/useListItems";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const useStyles = createUseStyles(({
    selectParent: {
        margin: '2rem auto',
        position: 'relative',
        width: '20rem',
    },
    inputSelect: {
        padding: '0.5rem 0.2rem 0.5rem 1rem',
        borderRadius: '1rem',
        width: '100%',
        boxShadow: '0 0 0 1pt grey',
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        '&:focus': {
            border: '0.1rem solid #e2eff4',
        }
    },
    inputIcon: {
        top: '30%',
        right: '1%',
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
        margin: '0.3rem',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        padding: '0.5rem',
        position: 'relative'
    },
    itemSelected: {
        width: '90%',
        cursor: 'pointer',
        margin: '0.3rem',
        textAlign: 'left',
        background: '#e2eff4',
        borderRadius: '2rem',
        padding: '0.5rem',
        color: '#0ca7e2'
    },
    disabled: {
        pointerEvents: 'none'
    },
    checkIcon: {
        position: 'absolute',
        right: '5%',
        top: '35%',
        color: '#0ca7e2'
    },
    '@media (max-width: 767px)': {
        selectParent: {
            width: '70%',
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
    const ref = useRef(null);
    const [showList, setShowList] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [hoverItem, setHoverItem] = useState<number>();
    const { items, addItems, error } = useListItems([]);
    useOnClickOutside(ref, () => setShowList(false));
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
                    placeholder='Type and then press Enter' />

                <CustomizedIcon className={cx(classes.inputIcon, {
                    [classes.disabled]: !items || !items.length
                })}
                    type={showList ? "open" : "close"}
                    onClick={handleClickIcon}
                />
                <div className={showList ? classes.showList : classes.hiddenList}
                    ref={ref}>
                    {items.map((item: IItem) => (
                        <p key={item.id}
                            className={cx(classes.item, { [classes.itemSelected]: hoverItem === item.id })}
                            onClick={handleClickItem(item.title, item.id)}>{`${item.title}  ${item.emoji}`}
                            {hoverItem === item.id && <AiOutlineCheck className={classes.checkIcon} />}</p>
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