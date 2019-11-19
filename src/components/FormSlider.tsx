import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography, Slider } from '@material-ui/core';
import { Mark } from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    commonStyle: {
        width: 760,
        verticalAlign: 'center',
    },
    narrowStyle: {
        width: 180,
        verticalAlign: 'center',
    },
    extendedStyle: {
        width: 760,
        verticalAlign: 'center',
    },
    sliderStyle: {
        width: 256,
        minWidth: 256,
    }
}));

interface FormSliderProps {
    hint?: string;
    min: number;
    max: number;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    marks: Mark[];
}

function valuetext(value: number): string {
    return `${value}°C`;
}

export const FormSlider: React.FC<FormSliderProps> = props => {
    const { min, max, marks, setValue } = props;
    const styles = useStyles();

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     props.setValue(event.target.value);
    // };

    const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        const numVal = value as number;
        setValue(numVal);
    }
    return (
        <div>
            <Slider
                className={styles.sliderStyle}
                defaultValue={min}
                aria-labelledby="discrete-slider-custom"
                step={null}
                valueLabelDisplay="auto"
                min={min}
                max={max}
                value={props.value}
                onChange={handleChange}
                marks={marks}
            />
        </div>
    );
};
