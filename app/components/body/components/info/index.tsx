"use client";

import { useAppDispatch, useAppSelector } from '@/app/store';
import { toggleInfo } from '@/app/store/actions/info.actions';
import style from './style.module.scss';

type Props = {
    style?: React.CSSProperties
}

const ResourceInfo = (props: Props) => {
    const { show } = useAppSelector(state => state.resourceInfo)
    const dispatch = useAppDispatch()


    const toggleResourceInfo = () => {
        dispatch(toggleInfo())
    }


    return (
        <div id="resource-info-button" className={`${style.resourceInfo} ${show ? style.active : ""}`} style={props?.style} onClick={toggleResourceInfo}>
            <i className="bi bi-info-circle"></i>
        </div>
    )
}

export default ResourceInfo