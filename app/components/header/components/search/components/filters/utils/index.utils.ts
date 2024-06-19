
// TODO: this will fetch from DB
export const CONTENT_TYPE = ["mp4", "mp3", "jpg", "pdf", 'txt']

// TODO: this will fetch from DB
export const HASHTAGS = ["room", "party", "team"]

export const getContentType = (types: string[]) => types.map(val => ({
    label: val?.toUpperCase(),
    value: val
}));

// export const getTagsForSearch = (tags: string[]) => tags.map(val => ({
//     label: `#${val}`,
//     value: val
// }));