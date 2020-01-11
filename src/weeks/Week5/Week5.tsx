import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../components/Week/Week';
import { Task511 } from '../../tasks/Task511/Task511';

export class Week5 extends Week {

    weekName = 'Неделя 5. Числовые характеристики, сходимость';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab header="Упражнение 1. Задача 1"><Task511 /></AccordionTab>
                <AccordionTab disabled header="Упражнение 1. Задача 2 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 1 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 2 (coming soon)" />
                <AccordionTab disabled header="Упражнение 2. Задача 3 (coming soon)" />
            </Accordion>
        );
    }
}
