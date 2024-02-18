import style from '../style.module.scss'


const SearchLoader = () => {
    return (
        <div className={style.loader}>
            <h6>Loading....</h6>
            <div className={style.group}>
            </div>
        </div>
    )
}

export default SearchLoader