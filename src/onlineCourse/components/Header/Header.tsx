import React from 'react';

import { HeaderTemplate } from '../../../components/HeaderTemplate/HeaderTemplate';

export class Header extends HeaderTemplate {

    protected renderContent() {
        return (
            <>
                Это онлайн программа для решения задач из упражнений онлайн-курса Прикладная статистика.
                <br />

                Отдельное спасибо авторам программ и таблиц, на основе которых была создана эта:{' '}
                <strong>Никита Черняк</strong> (4.1, 6.2.2), <strong>Даниил Коровин</strong> (5.2.1),{' '}
                <strong>Света Пелевина</strong> (7),{' '}<strong>Павел Нестерчук</strong>{' '}
                (9: распределения геометрическое и Пуассона), <strong>Andrey Kharchuk</strong>{' '}
                (9: равномерное и нормальное распределения), <strong>Александр Щербаков</strong>{' '}
                (9: последнее задание в нормальном распределении).
            </>
        );
    }
}
