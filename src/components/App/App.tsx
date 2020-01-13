import React from 'react';
import { TabPanel, TabView } from 'primereact/tabview';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { Header as CourseHeader } from '../../onlineCourse/components/Header/Header';
import { Week4 } from '../../onlineCourse/weeks/Week4/Week4';
import { Week5 } from '../../onlineCourse/weeks/Week5/Week5';
import { Week6 } from '../../onlineCourse/weeks/Week6/Week6';
import { Week7 } from '../../onlineCourse/weeks/Week7/Week7';
import { Week8 } from '../../onlineCourse/weeks/Week8/Week8';
import { Week9 } from '../../onlineCourse/weeks/Week9/Week9';
import { Week10 } from '../../onlineCourse/weeks/Week10/Week10';
import { Header as FinalHeader } from '../../finalTest/components/Header/Header';

import './App.css';
import { Task1 } from '../../finalTest/tasks/Task1/Task1';
import { Task2 } from '../../finalTest/tasks/Task2/Task2';
import { Task3 } from '../../finalTest/tasks/Task3/Task3';

export class App extends React.Component {

    render() {
        return (
            <div className="App">
                <TabView>
                    <TabPanel header="Онлайн-курс">
                        <div className="margin-bottom"><CourseHeader /></div>
                        <div className="margin-bottom"><Week4 /></div>
                        <div className="margin-bottom"><Week5 /></div>
                        <div className="margin-bottom"><Week6 /></div>
                        <div className="margin-bottom"><Week7 /></div>
                        <div className="margin-bottom"><Week8 /></div>
                        <div className="margin-bottom"><Week9 /></div>
                        <div><Week10 /></div>
                    </TabPanel>

                    <TabPanel header="Зачёт">
                        <div className="margin-bottom"><FinalHeader /></div>

                        <Accordion multiple>
                            <AccordionTab header="Задача 1"><Task1 /></AccordionTab>
                            <AccordionTab header="Задача 2"><Task2 /></AccordionTab>
                            <AccordionTab header="Задача 3"><Task3 /></AccordionTab>
                            <AccordionTab disabled header="Задача 4 (coming soon)"></AccordionTab>
                            <AccordionTab disabled header="Задача 5 (coming soon)"></AccordionTab>
                            <AccordionTab disabled header="Задача 6 (coming soon)"></AccordionTab>
                            <AccordionTab disabled header="Задача 7 (coming soon)"></AccordionTab>
                            <AccordionTab disabled header="Задача 8 (coming soon)"></AccordionTab>
                        </Accordion>
                    </TabPanel>
                </TabView>
            </div>
        );
    }
}
