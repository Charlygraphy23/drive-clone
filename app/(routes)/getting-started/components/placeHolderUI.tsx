import style from '../style.module.scss'

const PlaceHolderUI = () => {
    return (
        <div className={style.placeHolder}>
            <aside>
                <div></div>
                <div></div>
                <div></div>
            </aside>
            <main>
                <span>Folders</span>
                <div className={style.folder}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <span>Files</span>
                <table className={style.files}>
                    <tbody>
                        <tr>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </main>
        </div>
    )
}

export default PlaceHolderUI