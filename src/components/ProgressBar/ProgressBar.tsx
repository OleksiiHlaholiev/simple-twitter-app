import { FC } from "react";
import logo from '../../assets/images/logo.svg';
import './ProgressBar.scss';

export interface ProgressBarProps {
    classesToAdd?: string[];
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
    return (
        <div className={'progress-cont'}>
            <img src={logo} className="progress-react" alt="logo" />
        </div>
    )
}