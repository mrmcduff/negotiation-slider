import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Mark } from '@material-ui/core/Slider';
import { FormSlider } from './FormSlider';
import { TextField } from '@material-ui/core';
import { splitNumberList, splitLabelList } from '../helpers/textHelpers';

const useStyles = makeStyles(theme => ({
    stackStyle: {
        display: 'flex',
        flexDirection: 'column',
    },
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    entryStyle: {
        width: 256,

    },
    extendedStyle: {
        width: 760,
        verticalAlign: 'center',
    },
    sliderStyle: {
        width: 384,
        minWidth: 384,
    }
}));

interface TableStackProps {
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const DEFAULT_MARKS = [
    {
        value: 1,
        label: 'one'
    },
    {
        value: 2,
        label: 'two'
    }, {
        value: 3,
        label: 'three'
    }, {
        value: 4,
        label: 'four'
    }, {
        value: 5,
        label: 'five'
    },
] as const;

function getMarksMinMax(mx: Mark[]): { min: number, max: number } {
    let min = mx[0].value;
    let max = mx[0].value;
    mx.forEach(m => {
        if (m.value < min) {
            min = m.value;
        }
        if (m.value > max) {
            max = m.value;
        }
    });
    return { min, max }
}

export const TableStack: React.FC<TableStackProps> = props => {
    const styles = useStyles();
    const [selection, setSelection] = useState(1);
    const [marks, setMarks] = useState<Mark[]>([...DEFAULT_MARKS]);

    const [textLabel, setTextLabel] = useState('');
    const [textValues, setTextValues] = useState('');
    const [min, setMin] = useState<number>(DEFAULT_MARKS[0].value);
    const [max, setMax] = useState<number>(DEFAULT_MARKS[4].value);

    useEffect(() => {
        const outputVals = splitLabelList(textLabel);
        if (outputVals.length > 0) {
            const updatedMarks = marks.map((mark, index) => ({ value: mark.value, label: outputVals[index] }));
            setMarks(updatedMarks);
        }
    }, [textLabel]);
    useEffect(() => {
        const outputVals = splitNumberList(textValues);
        if (outputVals.length > 0) {
            const updatedMarks = marks.map((mark, index) => ({ value: outputVals[index], label: mark.label }));
            const minimax = getMarksMinMax(updatedMarks);
            setMin(minimax.min);
            setMax(minimax.max);
            setMarks(updatedMarks);
        }
    }, [textValues]);
    useEffect(() => {
        props.setValue(selection);
    }, [selection]);
    return (
        <div className={styles.stackStyle}>
            <FormSlider
                value={selection}
                setValue={setSelection}
                min={min}
                max={max}
                marks={marks}
            />
            <div className={styles.rowStyle}>
                <Typography variant="body2">{'Labels'}</Typography>
                <TextField
                    className={styles.entryStyle}
                    rows={1}
                    margin="none"
                    placeholder={'Labels'}
                    variant="outlined"
                    value={textLabel}
                    onChange={event => setTextLabel(event.target.value)}
                    spellCheck={false}
                />
            </div>
            <div className={styles.rowStyle}>
                <Typography variant="body2">{'Values'}</Typography>
                <TextField
                    className={styles.entryStyle}
                    rows={1}
                    margin="none"
                    placeholder={'Values'}
                    variant="outlined"
                    value={textValues}
                    onChange={event => setTextValues(event.target.value)}
                    spellCheck={false}
                />
            </div>
        </div>
    );
}