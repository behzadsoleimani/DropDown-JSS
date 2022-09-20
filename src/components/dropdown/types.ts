export interface IItem {
    id: number,
    title: string,
    emoji: string
}

export interface ICustomizedIcon {
    className: string,
    onClick: () => void,
    type: 'open' | 'close'
}


