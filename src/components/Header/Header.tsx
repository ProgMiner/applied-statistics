import React from 'react';
import { Panel } from 'primereact/panel';

import './Header.css';

export class Header extends React.Component {

    render() {
        return (
            <div className="Header">
                <Panel header="Добро пожаловать!">
                    Это онлайн программа для решения задач из упражнений онлайн-курса Прикладная статистика.
                    <br />

                    Отдельное спасибо авторам программ и таблиц, на основе которых была создана эта:{' '}
                    <strong>Никита Черняк</strong> (6.2.2), <strong>Света Пелевина</strong> (7),{' '}
                    <strong>Andrey Kharchuk</strong> (9: равномерное и нормальное распределения),{' '}
                    <strong>Павел Нестерчук</strong> (9: распределения геометрическое и Пуассона),{' '}
                    <strong>Александр Щербаков</strong> (9: последнее задание в нормальном распределении).
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
}

