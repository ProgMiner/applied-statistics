import React from 'react';

import { Week } from '../../../components/Week/Week';
import { Task10 } from '../../tasks/Task10/Task10';

export class Week10 extends Week {

    weekName = 'Неделя 10. Проверка гипотез';

    protected renderContent() {
        return (<Task10 />);
    }
}
