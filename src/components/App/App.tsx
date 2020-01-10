import React from 'react';

import { Week6 } from '../../weeks/Week6/Week6';
import { Week7 } from '../../weeks/Week7/Week7';

import './App.css';
import { Panel } from 'primereact/panel';
import { Week8 } from '../../weeks/Week8/Week8';
import { Week10 } from '../../weeks/Week10/Week10';

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

                    <small>
                        (донатить сюда: <strong>5321<span style={{ paddingLeft: '0.5ch' }} />
                        8687<span style={{ paddingLeft: '0.5ch' }} />2723<span style={{ paddingLeft: '0.5ch' }} />
                        3422</strong> — MasterCard Банк СПб;&nbsp;

                        <a href="https://my.qiwi.com/Erydan-DMVuYwfjtW" target="_blank" rel="noopener noreferrer">
                            Qiwi
                        </a>)
                    </small>
                </Panel>

                <Week6 />
                <Week7 />
                <Week8 />
                <Week10 />
            </div>
        );
    }
}
