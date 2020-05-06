import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, BackHandler } from 'react-native';
import RNVideo from 'react-native-video';
import Toolbar from './Toolbar';
import SystemSetting from 'react-native-system-setting';
class Player extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            play: true,
            currentTime: 0,
            seekableDuration: 0,
            resizeMode: 'contain',
            volume: 0
        };
        this.initialize = () => {
            SystemSetting.getVolume().then((volume) => {
                this.setState({ volume });
            });
        };
        this.hardwareBackPress = () => {
        };
        this.onProgress = (e) => {
            this.setState({ currentTime: e.currentTime, seekableDuration: e.seekableDuration });
        };
        this.onChangeSeek = (e) => {
            this.toolbarRef.witeHide();
            this.videoRef.seek(e);
        };
        this.onChangePlayState = () => {
            this.toolbarRef.witeHide();
            this.setState({ play: !this.state.play });
        };
        this.replay10 = () => {
            this.toolbarRef.witeHide();
            this.videoRef.seek(this.state.currentTime - 10);
        };
        this.forward10 = () => {
            this.toolbarRef.witeHide();
            this.videoRef.seek(this.state.currentTime + 10);
        };
        this.onResize = () => {
            this.toolbarRef.witeHide();
            if (this.state.resizeMode === "contain") {
                this.setState({ resizeMode: 'stretch' });
            }
            else {
                this.setState({ resizeMode: 'contain' });
            }
        };
        this.onEnd = () => {
            this.toolbarRef.witeHide();
            this.setState({ play: !this.state.play });
            this.videoRef.seek(0);
        };
        this.onVolume = (e) => {
            const volume = e;
            SystemSetting.setVolume(volume);
            this.setState({ volume });
        };
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        this.initialize();
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress);
    }
    render() {
        return (<View style={[styles.container, this.props.style]}>
          <RNVideo ref={ref => (this.videoRef = ref)} paused={!this.state.play} source={this.props.source} style={[styles.video, this.props.videoStyle]} resizeMode={this.state.resizeMode} fullscreen={true} useTextureView={this.props.useTextureView} onProgress={this.onProgress} onEnd={this.onEnd} volume={this.state.volume}/>
          <Toolbar ref={ref => (this.toolbarRef = ref)} currentTime={this.state.currentTime} seekableDuration={this.state.seekableDuration} onChangeSeek={this.onChangeSeek} playState={this.state.play} onChangePlayState={this.onChangePlayState} replay10={this.replay10} forward10={this.forward10} onResize={this.onResize} volume={this.state.volume} onVolume={this.onVolume} onBack={this.props.onBack}/>
      </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
export default Player;
