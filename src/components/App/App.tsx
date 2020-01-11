import React from 'react';

import { Header } from '../Header/Header';
import { Week5 } from '../../weeks/Week5/Week5';
import { Week6 } from '../../weeks/Week6/Week6';
import { Week7 } from '../../weeks/Week7/Week7';
import { Week8 } from '../../weeks/Week8/Week8';
import { Week9 } from '../../weeks/Week9/Week9';
import { Week10 } from '../../weeks/Week10/Week10';

import './App.css';

export class App extends React.Component {

    render() {
        return (
            <div className="App">
                <div className="margin-bottom"><Header /></div>
                <div className="margin-bottom"><Week5 /></div>
                <div className="margin-bottom"><Week6 /></div>
                <div className="margin-bottom"><Week7 /></div>
                <div className="margin-bottom"><Week8 /></div>
                <div className="margin-bottom"><Week9 /></div>
                <div><Week10 /></div>
            </div>
        );
    }
}
