import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import React from 'react';
import { Typography } from '@material-ui/core';
import { number } from 'prop-types';

const useStyles = makeStyles(theme => ({
    formRow: {
        height: '40px',
        padding: '0px 0px 0px 4px',
        marginBottom: theme.spacing(3),
    },
    formRowExtended: {
        height: '100px',
        marginBottom: theme.spacing(3),
    },
    rowLabel: {
        minWidth: '240px',
        fontWeight: 'bold',
        padding: '10px 0px 10px 0px',
    },
    flexHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}));

interface FormRowItemProps {
    title: string;
    extended?: boolean;
    children(): JSX.Element;
    displayValue: number;
}

const createRowLabel = (title: string, styles: string) => {
    return <div className={styles}>{title}</div>;
};

export const FormRowItem: React.FC<FormRowItemProps> = props => {
    const styles = useStyles();
    // const commonStyles = useCommonStyles();

    return (
        <div className={cx(styles.flexHorizontal, props.extended ? styles.formRowExtended : styles.formRow)}>
            {createRowLabel(props.title, styles.rowLabel)}
            {props.children()}
            <Typography variant="body1">{props.displayValue.toString()}</Typography>
        </div>
    );
};
