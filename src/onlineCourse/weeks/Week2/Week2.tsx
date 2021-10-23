import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task212 } from '../../tasks/Task212/Task212';


export class Week2 extends Week {

    weekName = 'Неделя 2. Простейшие случайные величины';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab disabled header="Упражнение 1. Задача 1 (coming soon)" />
                <AccordionTab header="Упражнение 1. Задача 2"><Task212 /></AccordionTab>
                <AccordionTab disabled header="Упражнение 2. Задача 1 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 2 (coming soon)" />
            </Accordion>
        );
    }
}
