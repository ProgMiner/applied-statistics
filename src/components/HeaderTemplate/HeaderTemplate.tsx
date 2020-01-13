import React from 'react';
import { Panel } from 'primereact/panel';

import './HeaderTemplate.css';

export abstract class HeaderTemplate extends React.Component {

    render() {
        return (
            <div className="Header">
                <Panel header="Добро пожаловать!">
                    {this.renderContent()}

                    <br />
                    <br />

                    Автор:{' '}
                    <a href="https://byprogminer.ru/vk" target="_blank" rel="noopener noreferrer">Доморацкий Эридан</a>.{' '}
                    <strong>В случае ошибки (например, вывода неправильного ответа), пишите, пожалуйста, в ЛС!</strong>
                    <br />

                    <small>
                        (донатить сюда: <strong>5321<span style={{ paddingLeft: '0.5ch' }} />{' '}
                        8687<span style={{ paddingLeft: '0.5ch' }} />2723<span style={{ paddingLeft: '0.5ch' }} />{' '}
                        3422</strong> — MasterCard Банк СПб;{' '}

                        <a href="https://my.qiwi.com/Erydan-DMVuYwfjtW" target="_blank" rel="noopener noreferrer">Qiwi</a>)
                    </small>
                </Panel>
            </div>
        );
    }

    protected abstract renderContent(): React.ReactNode;
}
