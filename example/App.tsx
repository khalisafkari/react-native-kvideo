import React from 'react'
import Player from './Player'

export default () => {
  return (
  <Player 
    useTextureView={true}
    source={{ 
        uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
    }} 
  />)
}