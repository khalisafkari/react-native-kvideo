import { Component } from 'react';
interface prosp {
    currentTime: number | null | undefined;
    seekableDuration: number | null | undefined;
    onChangeSeek?(e: number | null): void;
    playState: boolean | undefined;
    onChangePlayState?(): void;
    replay10?(): void;
    forward10?(): void;
    onResize?(): void;
    volume?: number;
    onVolume?(e: number): void;
    onBack?(): void;
}
interface state {
    showHide: boolean;
}
declare class Toolbar extends Component<prosp, state> {
    private timeRef;
    private showValue;
    state: state;
    componentDidMount(): void;
    witeHide: () => void;
    render(): JSX.Element;
}
export default Toolbar;
