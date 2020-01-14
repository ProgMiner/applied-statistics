import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Task1 } from '../../tasks/Task1/Task1';
import { Task2 } from '../../tasks/Task2/Task2';
import { Task3 } from '../../tasks/Task3/Task3';
import { Task4 } from '../../tasks/Task4/Task4';
import { Task5 } from '../../tasks/Task5/Task5';
import { Task6 } from '../../tasks/Task6/Task6';

export class FinalTest extends React.Component {

    render() {
        return (
            <Accordion multiple>
                <AccordionTab header="Задача 1"><Task1 /></AccordionTab>
                <AccordionTab header="Задача 2"><Task2 /></AccordionTab>
                <AccordionTab header="Задача 3"><Task3 /></AccordionTab>
                <AccordionTab header="Задача 4"><Task4 /></AccordionTab>
                <AccordionTab header="Задача 5"><Task5 /></AccordionTab>
                <AccordionTab header="Задача 6"><Task6 /></AccordionTab>
                <AccordionTab disabled header="Задача 7 (coming soon)" />
                <AccordionTab disabled header="Задача 8 (coming soon)"></AccordionTab>
            </Accordion>
        );
    }
}
