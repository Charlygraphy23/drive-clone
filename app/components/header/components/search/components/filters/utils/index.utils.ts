
// TODO: this will fetch from DB
export const CONTENT_TYPE = ["mp4", "mp3", "jpg", "pdf", 'txt']

// TODO: this will fetch from DB
export const HASHTAGS = ["room", "party", "team"]

export const getContentType = (types: string[]) => types.map(val => ({
    label: val?.toUpperCase(),
    value: val
}));


export const searchDebounce = (fn: (..._args: unknown[]) => void) => {
    let timer: NodeJS.Timeout | undefined = undefined;
    return (...args: unknown[]) => {

        if (timer) {
            clearTimeout(timer)
            timer = undefined
            return;
        }

        timer = setTimeout(() => {
            console.log("CALL APU")
            fn(...args)
        }, 1000)
    }

}
// export const getTagsForSearch = (tags: string[]) => tags.map(val => ({
//     label: `#${val}`,
//     value: val
// }));