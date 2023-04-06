import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';

function ParameterView(props){
    return (<div>
        <div>
            <h2>Tempo</h2>
            <p>BPM</p>
            <Slider getAriaLabel={() => 'Temperature range'} value={value} onChange={onChangeACB} valueLabelDisplay="auto" getAriaValueText={valuetext} />
        </div>
        <div>
            <h2>Loudness</h2>
            <p>Db</p>
            <Slider getAriaLabel={() => 'Temperature range'} value={value} onChange={onChangeACB} valueLabelDisplay="auto" getAriaValueText={valuetext} />
        </div>
        <div>
            <h2>Instrumentalness</h2>
            <p>Percent</p>
            <Slider getAriaLabel={() => 'Temperature range'} value={value} onChange={onChangeACB} valueLabelDisplay="auto" getAriaValueText={valuetext} />
        </div>
        <div>
            <h1>Danceable</h1>
            <Switch checked={checked} onChange={onChangeACB}/>
        </div>
        <div>
            <h1>Acoustic</h1>
            <Switch checked={checked} onChange={onChangeACB}/>
        </div>
        
    </div>);

    function onChangeACB(){
        // TODO: make it work uwu
    }
    
}

export default ParameterView;