import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
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
        
        <div class="parameterSlider" id="tempoSlider">
            <h2>Tempo</h2>
            <p>BPM</p>
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
        <div class="parameterSlider" id="loudSlider">
            <h2>Loudness</h2>
            <p>Db</p>
            <Slider getAriaLabel={() => 'loudness range'} 
                    value={loudValue} 
                    onChange={onChangeLoudnessACB} 
                    step={1}
                    min={-60.0}
                    max={0.0}
                    valueLabelDisplay="auto" />
        </div>
        <div class="parameterSlider" id="instrSlider">
            <h2>Instrumentalness</h2>
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
        <div class = "parameterSwitch">
            <h2>Danceable</h2>
            <Switch checked={props.checked} onChange={onChangeDanceableACB}/>
        </div>
        <div class = "parameterSwitch">
            <h2>Acoustic</h2>
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