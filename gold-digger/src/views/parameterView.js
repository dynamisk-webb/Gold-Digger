import Slider,  { sliderClasses } from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';



function ParameterView(props){

    const [tempValue, setTempValue] = React.useState([props.model.tempo.min, props.model.tempo.max]);
    const [loudValue, setLoudValue] = React.useState([props.model.loudness.min, props.model.loudness.max]);
    const [instrValue, setInstrValue] = React.useState([props.model.instrumentalness.min, props.model.instrumentalness.max]);

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
                root:{
                    color: "#FF6B35"
                }
              },
            },
            MuiSwitch: {
                styleOverrides: {
                    root:{
                        color: "#FF6B35"
                    },
                    checked:{
                    color: "#FF6B35"
                    }
                },
            }
        }
      });
    
    const onChangeTempoACB = (event, newValue) => {
        setTempValue(newValue);
        props.changeTempo(tempValue);
    }

    const onChangeLoudnessACB = (event, newValue) => {
        setLoudValue(newValue);
        props.changeLoudness(loudValue);
    }

    const onChangeInstrumentalnessACB = (event, newValue) => {
        setInstrValue(newValue);
        props.changeInstrumentalness(instrValue);
    }


    return (
        <ThemeProvider theme={finalTheme}>
        <div id="parameterGrid">
        <div className="parameterSlider" id="tempoSlider">
            <Tooltip title={<p style={TooltipStyle}>Overall estimated tempo in beats per minute (BPM). Average is 90-99 BPM. </p>}>
                <div className="parameterTitle">
                    <h2 className='white paddingLess'>Tempo</h2>
                    <p className='gray'>(BPM)</p>
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
            marks={[{value: 0, label: "0 bpm"}]}
                />
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
                    min={-60.0}
                    max={0.0}
                    valueLabelDisplay="auto" />
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
        </div>
        <div className = "parameterSwitch">
            <Tooltip title={<p style={TooltipStyle}>Whether or not a song is suitable for dancing. If you choose danceable, you will only get danceable music. If not, you will get a mix.</p>}>
                <h2 className='white'>Danceable</h2>
            </Tooltip>
            <Switch checked={props.model.danceable} onChange={onChangeDanceableACB}/>
        </div>
        <div className = "parameterSwitch">
            <Tooltip title={<p style={TooltipStyle}>Whether or not a song only contains acoustic instruments. If you choose acoustic, you will only get acoustic music. If not, you will get a mix.</p>}>
                <h2 className='white'>Acoustic</h2>
            </Tooltip>
            <Switch checked={props.model.acoustic} onChange={onChangeAcousticACB}/>
        </div>
        
    </div>
    </ThemeProvider>);


    function onChangeDanceableACB(evt){
        props.changeDanceable(evt.target.value);
    }

    function onChangeAcousticACB(evt){
        props.changeAcoustic(evt.target.value);
    }
}

export default ParameterView;