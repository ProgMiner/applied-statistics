import React from 'react';

import { HeaderTemplate } from '../../../components/HeaderTemplate/HeaderTemplate';

export class Header extends HeaderTemplate {

    protected renderContent() {
        return (
            <>
                Это онлайн программа для решения задач из зачёта по онлайн-курсу Прикладная статистика.
                <br />

                Отдельное спасибо <strong>Софье Датской</strong> за документ, на основе которого была сделана эта программа.

                <br />
                <br />

                <strong>Внимание!</strong> Проверяйте условия задачи перед отправкой.{' '}
                Если ваше условие не совпадает с условием в решателе,{' '}
                то скорее всего ваша задача к сожалению не реализована.
            </>
        );
    }
}
