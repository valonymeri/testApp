export interface Posts{
    posts: {
        data: [
            {
                id: number
                title: string
            },
        ],
        meta: {
            totalCount: number
        }
    }
}

