import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task411 } from '../../tasks/Task411/Task411';
import { Task412 } from '../../tasks/Task412/Task412';
import { Task413 } from '../../tasks/Task413/Task413';
import { Task421 } from '../../tasks/Task421/Task421';
import { Task422 } from '../../tasks/Task422/Task422';
import { Task423 } from '../../tasks/Task423/Task423';
import { Task431 } from '../../tasks/Task431/Task431';
import { Task432 } from '../../tasks/Task432/Task432';

export class Week4 extends Week {

    weekName = 'Неделя 4. Типы распределений случайных величин';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab header="Упражнение 1. Задача 1"><Task411 /></AccordionTab>
                <AccordionTab header="Упражнение 1. Задача 2"><Task412 /></AccordionTab>
                <AccordionTab header="Упражнение 1. Задача 3"><Task413 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 1"><Task421 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 2"><Task422 /></AccordionTab>
                <AccordionTab header="Упражнение 2. Задача 3"><Task423 /></AccordionTab>
                <AccordionTab header="Упражнение 3. Задача 1"><Task431 /></AccordionTab>
                <AccordionTab header="Упражнение 3. Задача 2"><Task432 /></AccordionTab>
            </Accordion>
        );
    }
}
