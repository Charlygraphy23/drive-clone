import SearchFilters from "./components/filters";
import SearchModal from "./components/searchModal";
import SearchProvider from "./provider";
import style from "./style.module.scss";



const SearchComponent = () => {

    return (
        <div className={style.search}>
            <SearchProvider>
                <div className={style.body}>
                    <SearchModal />
                    <SearchFilters />
                </div>
            </SearchProvider >
        </div>

    );
};

export default SearchComponent;
