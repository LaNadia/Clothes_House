export interface TCardList{
    clothes: TCard[]
}

export interface TCard {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image:string,
    rating: object,
    quantity?: number
}

export interface TStateUse {
    url : string
}

export interface TStateUseList {
    pics: TStateUse[]
}

export interface TStory { 
        _id?: string,
        title?: string,
        author?: string,
        story?: string,
        moral?: string
        url?: string
}

export interface TStoriesList {
    stories : TStory[]
}

export interface TInfo {
    name: string,
    insideInfo: string
}


export interface TForm {
    title:string,
    handleClick: (email: string, password: string) => void
}

export interface TUserInfo {
    email: string | null,
    token: string | null,
    id: string | null,
}