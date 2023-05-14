/**
 * ParameterView renders a view displaying a set of sliders and inputs for configuring 
 * the parameters of the Gold Digger application.
*/

import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

function ParameterView(props) {

    // Styles
    const TooltipStyle = {
        color: "white",
        marginTop: 0,
        marginBottom: 0,
        top: 0
    };

    const finalTheme = createTheme({
        components: {
            MuiSlider: {
                styleOverrides: {
                    root: {
                        color: "#FF6B35"
                    },
                    mark: {
                        color: "#ffffff"
                    }
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    switchBase: {
                        color: "#ccc"
                    },
                    colorPrimary: {
                        "&.Mui-checked": {
                            color: "#FF6B35"
                        }
                    },
                    track: {
                        opacity: 0.2,
                        backgroundColor: "#fff",
                        ".Mui-checked.Mui-checked + &": {
                            opacity: 0.7,
                            backgroundColor: "#a3593e"
                        }
                    }
                }
            }
        },
        floatingLabelFocusStyle: {
            color: "#ffffff"
        },
        mark: {
            color: "#ffffff"
        }
    });

    // Variables 
    const [tempValue, setTempValue] = React.useState([props.model.tempo.min, props.model.tempo.max]);
    const [loudValue, setLoudValue] = React.useState([props.model.loudness.min, props.model.loudness.max]);
    const [instrValue, setInstrValue] = React.useState([props.model.instrumentalness.min, props.model.instrumentalness.max]);


    // Functions

    /* When there's a change in the tempo value, update the model */
    const onChangeTempoACB = (event, newValue) => {
        setTempValue(newValue);
        props.changeTempo(tempValue);
    }

    /* When there's a change in the loudness value, update the model */
    const onChangeLoudnessACB = (event, newValue) => {
        setLoudValue(newValue);
        props.changeLoudness(loudValue);
    }

    /* When there's a change in the instrumentalness value, update the model */
    const onChangeInstrumentalnessACB = (event, newValue) => {
        setInstrValue(newValue);
        props.changeInstrumentalness(instrValue);
    }

    /* When there's a change in the danceability value, update the model */
    function onChangeDanceableACB(evt) {
        props.changeDanceable(evt.target.value);
    }

    /* When there's a change in the acoustic value, update the model */
    function onChangeAcousticACB(evt) {
        props.changeAcoustic(evt.target.value);
    }


    return (
        <ThemeProvider theme={finalTheme}>
            <div id="parameterGrid">
                <div className="parameterSlider" id="tempoSlider">
                    <Tooltip title={<p style={TooltipStyle}>Overall estimated tempo in beats per minute (BPM). Average is 90-99 BPM. </p>}>
                        <div className="parameterTitle">
                            <h2 className='white paddingLess'>Tempo</h2>
                            <p className='gray paddingLess'>(BPM)</p>
                        </div>
                    </Tooltip>

                    <Slider getAriaLabel={() => 'tempo range'}
                        defaultValue={20}
                        onChange={onChangeTempoACB}
                        value={tempValue}
                        step={1}
                        min={0.0}
                        max={300.0}
                        valueLabelDisplay="auto"
                        color="primary"
                        marks={[{ value: 0, label: "0 bpm" }]}
                    />
                    <div className="sliderMarks">
                        <p className='leftSliderVal'>0 bpm</p>
                        <p className='rightSliderVal'>300 bpm</p>
                    </div>
                </div>
                <div className="parameterSlider" id="loudSlider">
                    <Tooltip title={<p style={TooltipStyle}>Overall loudness in decibels (dB). Average is -14 dB</p>}>
                        <div className="parameterTitle">
                            <h2 className='white'>Noisiness</h2>
                            <p className='gray'>(dB)</p>
                        </div>
                    </Tooltip>

                    <Slider getAriaLabel={() => 'loudness range'}
                        value={loudValue}
                        onChange={onChangeLoudnessACB}
                        step={1}
                        min={-30.0}
                        max={0.0}
                        valueLabelDisplay="auto" />
                    <div className="sliderMarks">
                        <p className='leftSliderVal'>-30 dB</p>
                        <p className='rightSliderVal'>0 dB</p>
                    </div>
                </div>
                <div className="parameterSlider" id="instrSlider">
                    <Tooltip title={<p style={TooltipStyle}>Overall likelyhood of vocals in the song. Rap or spoken word tracks are clearly “vocal”.</p>}>
                        <div className="parameterTitle">
                            <h2 className='white'>Amount of vocals</h2>
                            <p className='gray'>(Percent)</p>
                        </div>
                    </Tooltip>

                    <Slider getAriaLabel={() => 'instrumentalness range'}
                        value={instrValue}
                        onChange={onChangeInstrumentalnessACB}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={100}
                    />
                    <div className="sliderMarks">
                        <p className='leftSliderVal'>0%</p>
                        <p className='rightSliderVal'>100%</p>
                    </div>
                </div>
                <div className="parameterSwitch">
                    <Tooltip title={<p style={TooltipStyle}>Whether or not a song is suitable for dancing. If you choose danceable, you will only get danceable music. If not, you will get a mix.</p>}>
                        <h2 className='white'>Danceable</h2>
                    </Tooltip>
                    <Switch
                        checked={props.checked}
                        onChange={onChangeDanceableACB}
                        sx={{
                            color: 'white',
                        }}
                    />
                </div>
                <div className="parameterSwitch">
                    <Tooltip title={<p style={TooltipStyle}>Whether or not a song only contains acoustic instruments. If you choose acoustic, you will only get acoustic music. If not, you will get a mix.</p>}>
                        <h2 className='white'>Acoustic</h2>
                    </Tooltip>
                    <Switch checked={props.checked} onChange={onChangeAcousticACB} />
                </div>

            </div>
        </ThemeProvider>);

}

export default ParameterView;