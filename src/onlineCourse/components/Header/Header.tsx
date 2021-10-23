import React from 'react';

import { HeaderTemplate } from '../../../components/HeaderTemplate/HeaderTemplate';

export class Header extends HeaderTemplate {

    protected renderContent() {
        return (
            <>
                Это онлайн программа для решения задач из упражнений онлайн-курса Прикладная статистика.
                <br />

                Спасибо за то, что <strong> Эридан Доморацкий</strong> сделал этот решатель,
                а я просто добавил сюда свои решатели :)
                <small>
                    (донатить сюда: <strong>5321<span style={{ paddingLeft: '0.5ch' }} />{' '}
                    8687<span style={{ paddingLeft: '0.5ch' }} />2723<span style={{ paddingLeft: '0.5ch' }} />{' '}
                    3422</strong> — MasterCard Банк СПб;{' '}

                    <a href="https://my.qiwi.com/Erydan-DMVuYwfjtW" target="_blank" rel="noopener noreferrer">Qiwi</a>)
                </small>

            </>
        );
    }
}
