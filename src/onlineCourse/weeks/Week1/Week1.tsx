import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task112 } from '../../tasks/Task112/Task112';
import { Task113 } from '../../tasks/Task113/Task113';
import { Task142 } from '../../tasks/Task142/Task142';


export class Week1 extends Week {

    weekName = 'Неделя 1. Простейшая теория вероятностей';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab disabled header="Упражнение 1. Задача 1 (coming soon)" />
                <AccordionTab header="Упражнение 1. Задача 2"><Task112 /></AccordionTab>
                <AccordionTab header="Упражнение 1. Задача 3"><Task113 /></AccordionTab>
                <AccordionTab disabled header="Упражнение 2. Задача 1 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 2 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 3 (coming soon)" />
                <AccordionTab disabled header="Упражнение 3. Задача 1 (coming soon)" />
                <AccordionTab disabled header="Упражнение 3. Задача 2 (coming soon)" />
                <AccordionTab disabled header="Упражнение 4. Задача 1 (coming soon)" />
                <AccordionTab header="Упражнение 4. Задача 2"><Task142 /></AccordionTab>
            </Accordion>
        );
    }
}
