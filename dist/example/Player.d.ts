import { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type resizeMode = 'stretch' | 'contain';
interface state {
    play?: boolean;
    currentTime: number;
    seekableDuration: number;
    resizeMode: resizeMode;
    volume: number;
}
interface source {
    uri?: string | undefined;
    headers?: Object;
}
interface props {
    useTextureView?: boolean;
    source?: source | any;
    style?: StyleProp<ViewStyle>;
    videoStyle?: StyleProp<ViewStyle>;
    onBack?(): void;
}
declare class Player extends Component<props, state> {
    private videoRef;
    private toolbarRef;
    state: state;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private initialize;
    private hardwareBackPress;
    private onProgress;
    private onChangeSeek;
    private onChangePlayState;
    private replay10;
    private forward10;
    private onResize;
    private onEnd;
    private onVolume;
    render(): JSX.Element;
}
export default Player;
