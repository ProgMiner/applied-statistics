import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task311 } from '../../tasks/Task311/Task311';
import { Task312 } from '../../tasks/Task312/Task312';
import { Task323 } from '../../tasks/Task323/Task323';
import { Task33 } from '../../tasks/Task33/Task33';


export class Week3 extends Week {

    weekName = 'Неделя 3. Общее понятие вероятностного пространства';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab header="Упражнение 1. Задание 1"><Task311 /></AccordionTab>
                <AccordionTab header="Упражнение 1. Задание 2"><Task312 /></AccordionTab>
                <AccordionTab disabled header="Упражнение 2. Задача 1 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 2 (coming soon)" />
                <AccordionTab header="Упражнение 2. Задание 3"><Task323 /></AccordionTab>
                <AccordionTab header="Упражнение 3"><Task33 /></AccordionTab>
            </Accordion>
        );
    }
}
