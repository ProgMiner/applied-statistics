import React from 'react';

import { HeaderTemplate } from '../../../components/HeaderTemplate/HeaderTemplate';

export class Header extends HeaderTemplate {

    protected renderContent() {
        return (
            <>
                Это онлайн программа для решения задач из зачёта по онлайн-курсу Прикладная статистика.
                <br />

                Отдельное спасибо <strong>Софии Датской</strong> за документ, на основе которого была сделана эта программа.

                <br />
                <br />

                Ссылка на оригинальный документ:{' '}
                <a href="https://docs.google.com/document/d/1Kjjv19xWbsBQ4cQ7yZrTYxsYumy1VXrijFso9nqKFOc/edit"
                   target="_blank" rel="noopener noreferrer">здесь</a>.

                <br />

                Ссылка на мой диск для загрузки фотографий с зачёта,{' '}
                там же таблица с ответами на уже известные задания:{' '}
                <a href="https://drive.google.com/drive/folders/1vOinRsiwMVQG2dGNu86rblORMPlhGnvs"
                   target="_blank" rel="noopener noreferrer">здесь</a>.

                <br />
                <br />

                <strong>Внимание!</strong> Проверяйте условия задачи перед отправкой.{' '}
                Если ваше условие не совпадает с условием в решателе,{' '}
                то скорее всего ваша задача к сожалению не реализована.
            </>
        );
    }
}
