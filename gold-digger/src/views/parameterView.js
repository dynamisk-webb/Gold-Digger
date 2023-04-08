import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';

function ParameterView(props){
    
    return (<div>
        <div>
            <h2>Tempo</h2>
            <p>BPM</p>
            <Slider getAriaLabel={() => 'Temperature range'} value={props.value} onChange={onChangeTempoACB} valueLabelDisplay="auto"  />
        </div>
        <div>
            <h2>Loudness</h2>
            <p>Db</p>
            <Slider getAriaLabel={() => 'Temperature range'} value={props.value} onChange={onChangeLoudnessACB} valueLabelDisplay="auto" />
        </div>
        <div>
            <h2>Instrumentalness</h2>
            <p>Percent</p>
            <Slider getAriaLabel={() => 'Temperature range'} value={props.value} onChange={onChangeInstrumentalnessACB} valueLabelDisplay="auto"  />
        </div>
        <div>
            <h1>Danceable</h1>
            <Switch checked={props.checked} onChange={onChangeDanceableACB}/>
        </div>
        <div>
            <h1>Acoustic</h1>
            <Switch checked={props.checked} onChange={onChangeAcousticACB}/>
        </div>
        
    </div>);

    function onChangeTempoACB(evt){
        props.changeTempo(evt.target.value);
    }

    function onChangeLoudnessACB(evt){
        props.changeLoudness(evt.target.value);
    }

    function onChangeInstrumentalnessACB(evt){
        props.changeInstrumentalness(evt.target.value);
    }

    function onChangeDanceableACB(evt){
        props.changeDanceable(evt.target.value);
    }

    function onChangeAcousticACB(evt){
        props.changeAcoustic(evt.target.value);
    }
}

export default ParameterView;