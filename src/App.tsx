import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FormRowItem, FormSlider, TableStack } from './components';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    commonStyle: {
        padding: 48,
    },
}));

const marksOne = [
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
];


const App: React.FC = () => {
    const styles = useStyles();
    const [bonus, setBonus] = useState(0);
    const [jobAssignment, setJobAssignment] = useState(0);
    const [vaca, setVaca] = useState(0);
    const [startDate, setStartDate] = useState(0);
    const [meCov, setMeCov] = useState(0);
    const [inCov, setInCov] = useState(0);
    const [salary, setSalary] = useState(0);
    const [location, setLocation] = useState(0);

    const [score, setScore] = useState(0);
    useEffect(() => {
        setScore(bonus + jobAssignment + vaca + startDate + meCov + inCov + salary + location);
    }, [bonus, jobAssignment, vaca, startDate, meCov, inCov, salary, location]);
    return (
        <div className={cx('App', styles.commonStyle)}>
            <Typography variant="h6">{`Your total Score: ${score}`}</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="left">Selection</TableCell>
                        <TableCell align="left">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableRow>
                    <TableCell>Bonus</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="bonus"
                            setValue={setBonus}
                        />
                    </TableCell>
                    <TableCell align="left">{bonus}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Job Assignment</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="jobassignment"
                            setValue={setJobAssignment}
                        />
                    </TableCell>
                    <TableCell align="left">{jobAssignment}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Vacation Time</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="vacation"
                            setValue={setVaca}
                        />
                    </TableCell>
                    <TableCell align="left">{vaca}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Starting Date</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="startdate"
                            setValue={setStartDate}
                        />
                    </TableCell>
                    <TableCell align="left">{startDate}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Moving Cvg</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="movingcoverage"
                            setValue={setMeCov}
                        />
                    </TableCell>
                    <TableCell align="left">{meCov}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Insurance Covg</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="insurancecoverage"
                            setValue={setInCov}
                        />
                    </TableCell>
                    <TableCell align="left">{inCov}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Salary</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="salary"
                            setValue={setSalary}
                        />
                    </TableCell>
                    <TableCell align="left">{salary}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell align="left">
                        <TableStack
                            storageKey="citylocation"
                            setValue={setLocation}
                        />
                    </TableCell>
                    <TableCell align="left">{location}</TableCell>
                </TableRow>
            </Table>
        </div>
    );
}

export default App;
