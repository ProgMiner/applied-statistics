import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task111 } from '../../tasks/Task111/Task111';
import { Task112 } from '../../tasks/Task112/Task112';
import { Task113 } from '../../tasks/Task113/Task113';
import { Task121 } from '../../tasks/Task121/Task121';
import { Task122 } from '../../tasks/Task122/Task122';
import { Task123 } from '../../tasks/Task123/Task123';
import { Task131 } from '../../tasks/Task131/Task131';
import { Task132 } from '../../tasks/Task132/Task132';
import { Task141 } from '../../tasks/Task141/Task141';
import { Task142 } from '../../tasks/Task142/Task142';

export class Week1 extends Week {

    weekName = 'Неделя 1. Простейшая теория вероятностей';

    protected renderContent() {
        return (
            <Accordion multiple>
            <AccordionTab header="Упражнение 1. Задача 2"><Task112 /></AccordionTab>
            <AccordionTab header="Упражнение 1. Задача 3"><Task113 /></AccordionTab>
            <AccordionTab header="Упражнение 4. Задача 2"><Task142 /></AccordionTab>
            </Accordion>
    );
    }
}