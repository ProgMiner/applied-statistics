import React from 'react';

import { Week6 } from '../../weeks/Week6/Week6';
import { Week7 } from '../../weeks/Week7/Week7';

import './App.css';
import { Panel } from 'primereact/panel';

export class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Panel header="Добро пожаловать!">
                    Это онлайн программа для решения задач из упражнений онлайн-курса Прикладная статистика.
                    <br />

                    Автор:&nbsp;
                    <a href="https://byprogminer.ru/vk" target="_blank" rel="noopener noreferrer">Доморацкий Эридан</a>
                    <br />

                    <a href="https://my.qiwi.com/Erydan-DMVuYwfjtW" target="_blank" rel="noopener noreferrer">
                        <small>(Донатить сюда)</small>
                    </a>
                </Panel>

                <Week6 />
                <Week7 />
            </div>
        );
    }
}
