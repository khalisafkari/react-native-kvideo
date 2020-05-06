import React, { Component } from 'react'
import { View, StyleSheet, StatusBar,BackHandler, StyleProp, ViewStyle } from 'react-native'
import RNVideo from 'react-native-video'
import Toolbar from './Toolbar';
import SystemSetting from 'react-native-system-setting'


type resizeMode = 'stretch' | 'contain'

interface state {
  play?:boolean
  currentTime:number
  seekableDuration:number
  resizeMode:resizeMode
  volume:number
}

interface source {
    uri?:string | undefined
    headers?:Object
}

interface props {
    useTextureView?:boolean
    source?:source | any
    style?:StyleProp<ViewStyle>
    videoStyle?:StyleProp<ViewStyle>
    onBack?():void
}

class Player extends Component<props,state> {

  private videoRef:any;
  private toolbarRef:any;

  state:state = {
    play:true,
    currentTime:0,
    seekableDuration:0,
    resizeMode:'contain',
    volume:0
  }

  componentDidMount(){
    StatusBar.setHidden(true)
    this.initialize()
    BackHandler.addEventListener('hardwareBackPress',this.hardwareBackPress)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.hardwareBackPress)
  }

  private initialize = () => {
    SystemSetting.getVolume().then((volume:number)=>{
      this.setState({ volume });
    });
  }

  private hardwareBackPress = ():any => {
      
  }


  private onProgress = (e:any) => {
    this.setState({ currentTime:e.currentTime,seekableDuration:e.seekableDuration })
  }

  private onChangeSeek = (e:number) => {
      this.toolbarRef.witeHide()
      this.videoRef.seek(e);
  }

  private onChangePlayState = () => {
      this.toolbarRef.witeHide()
      this.setState({ play:!this.state.play })
  }

  private replay10 = () => {
      this.toolbarRef.witeHide()
      this.videoRef.seek(this.state.currentTime - 10 );
  }

  private forward10 = () => {
      this.toolbarRef.witeHide()
      this.videoRef.seek(this.state.currentTime + 10 );
  }

  private onResize = () => {
      this.toolbarRef.witeHide()
      if(this.state.resizeMode === "contain"){
        this.setState({ resizeMode:'stretch' })
      }else{
        this.setState({ resizeMode:'contain' })
      }
  }

  private onEnd = () => {
      this.toolbarRef.witeHide();
      this.setState({ play:!this.state.play });
      this.videoRef.seek(0);
  }

  private onVolume = (e:number) => {
    const volume:number | any = e
    SystemSetting.setVolume(volume);
    this.setState({ volume })
  }

  render(){
    return (
      <View style={[styles.container,this.props.style]}>
          <RNVideo
            ref={ref => (this.videoRef = ref)}
            paused={!this.state.play}
            source={this.props.source}
            style={[styles.video,this.props.videoStyle]}
            resizeMode={this.state.resizeMode}
            fullscreen={true}
            useTextureView={this.props.useTextureView}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            volume={this.state.volume}
          />
          <Toolbar
            ref={ref => (this.toolbarRef = ref)}
            currentTime={this.state.currentTime}
            seekableDuration={this.state.seekableDuration}
            onChangeSeek={this.onChangeSeek}
            playState={this.state.play}
            onChangePlayState={this.onChangePlayState}
            replay10={this.replay10}
            forward10={this.forward10}
            onResize={this.onResize}
            volume={this.state.volume}
            onVolume={this.onVolume}
            onBack={this.props.onBack}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  video:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
  }
})

export default Player;