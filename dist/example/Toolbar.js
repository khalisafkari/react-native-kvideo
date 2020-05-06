import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const cache = [];
const ft = (n) => n < 10 ? '0' + n : n;
for (let i = 0; i < 3600; i++) {
    cache[i] = `${ft(i / 60 % 60 | 0)}:${ft(i % 60)}`;
}
// 时间格式化
function formatTime(time) {
    time = Math.round(time);
    if (cache[time]) {
        return cache[time];
    }
    else {
        let res = '00:00';
        if (time >= 3600) {
            res = `${ft(time / 3600 % 60 | 0)}:${ft(time / 60 % 60 | 0)}:${ft(time % 60)}`;
        }
        else {
            res = `${ft(time / 60 % 60 | 0)}:${ft(time % 60)}`;
        }
        cache[time] = res;
        return res;
    }
}
class Toolbar extends Component {
    constructor() {
        super(...arguments);
        this.showValue = new Animated.Value(0);
        this.state = {
            showHide: true
        };
        this.witeHide = () => {
            clearTimeout(this.timeRef);
            Animated.timing(this.showValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start();
            this.timeRef = setTimeout(() => {
                Animated.timing(this.showValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }).start();
            }, 3000);
        };
    }
    componentDidMount() {
        this.witeHide();
    }
    render() {
        const opacity = this.showValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });
        return (<View style={styles.container}>
                <TouchableOpacity style={styles.content} onPress={this.witeHide}>
                    <Animated.View style={[styles.headerContainer, { opacity }]}>
                        <View style={styles.header}>
                            <View style={styles.leftHeader}>
                                <TouchableOpacity style={[styles.btn]} activeOpacity={0.7} onPress={this.props.onBack}>
                                    <Icon name="x" size={20} color="white"/>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={this.props.onResize}>
                                    <Icon name="annotate" size={20} color='rgba(255,255,255,.55)'/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rightHeader}>
                                <Slider value={this.props.volume} maximumValue={1} onValueChange={this.props.onVolume} minimumTrackTintColor="#fff" thumbTintColor={'#fff'} maximumTrackTintColor="#fff" style={{ flex: 1 }}/>
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.footerContainer, { opacity }]}>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={this.props.replay10}>
                                <MaterialIcons name={'replay-10'} size={25} color="white"/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={this.props.onChangePlayState}>
                                <Icon name={this.props.playState ? 'pause' : 'play'} size={25} color="white"/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={this.props.forward10}>
                                <MaterialIcons name={'forward-10'} size={25} color="white"/>
                            </TouchableOpacity>

                            <View style={styles.btn}>
                                <Text style={styles.time}>{this.props.currentTime ? formatTime(this.props.currentTime) : null}</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Slider value={this.props.currentTime ? this.props.currentTime : 0} maximumValue={this.props.seekableDuration ? this.props.seekableDuration : 0} onValueChange={this.props.onChangeSeek} minimumTrackTintColor="#fff" thumbTintColor={'#fff'} maximumTrackTintColor="#fff"/>
                            </View>

                            <View style={styles.btn}>
                                <Text style={styles.time}>{this.props.seekableDuration ? formatTime(this.props.seekableDuration) : null}</Text>
                            </View>

                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
    },
    content: {
        flex: 1
    },
    headerContainer: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 40,
        margin: 25,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftHeader: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.88)',
        height: 40,
        alignItems: 'center',
        borderRadius: 10
    },
    rightHeader: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.88)',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        width: 100
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    footer: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'rgba(0,0,0,.88)',
        margin: 25,
        borderRadius: 10,
        alignItems: 'center'
    },
    btn: {
        marginHorizontal: 8
    },
    time: {
        color: 'white',
        fontSize: 10
    }
});
export default Toolbar;
