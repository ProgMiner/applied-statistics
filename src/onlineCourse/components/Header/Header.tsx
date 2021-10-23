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
            </>
        );
    }
}
