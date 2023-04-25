import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';


function ParameterView(props){

    const [tempValue, setTempValue] = React.useState([props.model.tempo.min, props.model.tempo.max]);
    const [loudValue, setLoudValue] = React.useState([props.model.loudness.min, props.model.loudness.max]);
    const [instrValue, setInstrValue] = React.useState([props.model.instrumentalness.min, props.model.instrumentalness.max]);
    
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


    return (<div id="parameterGrid">
        
        <div className="parameterSlider" id="tempoSlider">
            <Tooltip title={<p style={{ color: "white" }}>Overall estimated tempo in beats per minute (BPM)</p>}>
                <h2>Tempo</h2>
            </Tooltip>
            
            <p>(dB)</p>
            <Slider getAriaLabel={() => 'tempo range'} 
            defaultValue={20}
            onChange={onChangeTempoACB}
            value={tempValue}
            step={1}
            min={0.0}
            max={300.0}
            valueLabelDisplay="auto"
            color="secondary"
                    />
        </div>
        <div className="parameterSlider" id="loudSlider">
            <Tooltip title={<p style={{ color: "white" }}>Overall loudness in decibels (dB)</p>}>
                <h2>Noisiness</h2>
            </Tooltip>
            <p>Db</p>
            <Slider getAriaLabel={() => 'loudness range'} 
                    value={loudValue} 
                    onChange={onChangeLoudnessACB} 
                    step={1}
                    min={-60.0}
                    max={0.0}
                    valueLabelDisplay="auto" />
        </div>
        <div className="parameterSlider" id="instrSlider">
            <Tooltip title={<p style={{ color: "white" }}>Overall amount of vocals in the song</p>}>
                <h2>Amount of vocals</h2>
            </Tooltip>
            <p>Percent</p>
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
            <Tooltip title={<p style={{ color: "white" }}>Whether or not a song is suitable for dancing</p>}>
                <h2>Danceable</h2>
            </Tooltip>
            <Switch checked={props.checked} onChange={onChangeDanceableACB}/>
        </div>
        <div className = "parameterSwitch">
            <Tooltip title={<p style={{ color: "white" }}>Whether or not a song only contains acoustic instruments</p>}>
                <h2>Acoustic</h2>
            </Tooltip>
            <Switch checked={props.checked} onChange={onChangeAcousticACB}/>
        </div>
        
    </div>);


    function onChangeDanceableACB(evt){
        props.changeDanceable(evt.target.value);
    }

    function onChangeAcousticACB(evt){
        props.changeAcoustic(evt.target.value);
    }
}

export default ParameterView;