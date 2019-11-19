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
        alignItems: 'baseline'
    },
    entryStyle: {
        width: 384,
        minWidth: 384,
        marginLeft: 12,
        marginRight: 12,
    },
    extendedStyle: {
        width: 760,
        verticalAlign: 'center',
    },
    sliderStyle: {
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
    const { setValue } = props;
    const styles = useStyles();
    const [selection, setSelection] = useState(1);
    const [marks, setMarks] = useState<Mark[]>([...DEFAULT_MARKS]);

    const [textLabel, setTextLabel] = useState('');
    const [labelError, setLabelError] = useState(false);
    const [textValues, setTextValues] = useState('');
    const [valueError, setValueError] = useState(false);
    const [min, setMin] = useState<number>(DEFAULT_MARKS[0].value);
    const [max, setMax] = useState<number>(DEFAULT_MARKS[4].value);

    useEffect(() => {
        const outputVals = splitLabelList(textLabel);
        if (outputVals.length > 0) {
            const updatedMarks = [...marks].map((mark, index) => ({ value: mark.value, label: outputVals[index] }));
            setLabelError(false);
            setMarks(updatedMarks);
        } else {
            setLabelError(true);
        }
    }, [textLabel]);
    useEffect(() => {
        const outputVals = splitNumberList(textValues);
        if (outputVals.length > 0) {
            const updatedMarks = [...marks].map((mark, index) => ({ value: outputVals[index], label: mark.label }));
            const minimax = getMarksMinMax(updatedMarks);
            setMin(minimax.min);
            setMax(minimax.max);
            setValueError(false);
            setMarks(updatedMarks);
        } else {
            setValueError(true);
        }
    }, [textValues]);
    useEffect(() => {
        setValue(selection);
    }, [selection, setValue]);
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
                    variant="standard"
                    error={labelError}
                    value={textLabel}
                    onChange={event => setTextLabel(event.target.value)}
                    spellCheck={false}
                />
            </div>
            <div className={styles.rowStyle}>
                <Typography variant="body2">{'Scores'}</Typography>
                <TextField
                    className={styles.entryStyle}
                    rows={1}
                    margin="none"
                    placeholder={'Scores'}
                    variant="standard"
                    value={textValues}
                    error={valueError}
                    onChange={event => setTextValues(event.target.value)}
                    spellCheck={false}
                />
            </div>
        </div>
    );
}
