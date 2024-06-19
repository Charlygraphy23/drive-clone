import { authOptions } from "@/app/lib/authConfig";
import { getServerSession } from "next-auth";
import SearchFilters from "./components/filters";
import SearchModal from "./components/searchModal";
import SearchProvider from "./provider";
import style from "./style.module.scss";



const SearchComponent = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div className={style.search}>
            <SearchProvider>
                <div className={style.body}>
                    <SearchModal user={session?.user} />
                    <SearchFilters />
                </div>
            </SearchProvider >
        </div>

    );
};

export default SearchComponent;
