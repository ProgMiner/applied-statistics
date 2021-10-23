import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Week } from '../../../components/Week/Week';
import { Task212 } from '../../tasks/Task212/Task212';
import { Task221 } from '../../tasks/Task221/Task221';
import { Task222 } from '../../tasks/Task222/Task222';

export class Week2 extends Week {

    weekName = 'Неделя 2. Простейшие случайные величины';

    protected renderContent() {
        return (
            <Accordion multiple>
                <AccordionTab header="Упражнение 1. Задача 2"><Task212 /></AccordionTab>
            </Accordion>
        );
    }
}