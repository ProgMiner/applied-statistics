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
                    <a href="https://vk.com/egoredgry" target="_blank" rel="noopener noreferrer">RedGry</a>.{' '}
                    <strong>В случае ошибки (например, вывода неправильного ответа), пишите, пожалуйста, в ЛС!</strong>
                    <br />
                </Panel>
            </div>
        );
    }

    protected abstract renderContent(): React.ReactNode;
}
