import React from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import { LoadingContainer } from '../LoadingContainer/LoadingContainer';

export interface TaskState {

    answer?: React.ReactNode;
}

// noinspection JSIgnoredPromiseFromCall
export abstract class Task<S = {}, P = {}> extends React.Component<P, S & TaskState> {

    protected readonly className?: string | string[];

    private readonly taskClassName: string;
    private answerPromise?: Promise<React.ReactNode>;

    abstract state: S & TaskState;

    protected constructor(props: P) {
        super(props);

        const classNames = ['Task'];
        if (this.className) {
            if (Array.isArray(this.className)) {
                classNames.push(...this.className);
            } else {
                classNames.push(this.className);
            }
        }

        this.taskClassName = classNames.join(' ');
    }

    componentDidMount() {
        if (this.checkParameters()) {
            this.fetchAnswer();
        }
    }

    componentDidUpdate(
        prevProps: Readonly<React.PropsWithChildren<P>>,
        prevState: Readonly<S & TaskState>,
        snapshot?: any
    ) {
        if (!isEqual(omit(this.state, 'answer'), omit(prevState, 'answer')) && this.checkParameters()) {
            this.fetchAnswer();
        }
    }

    private async fetchAnswer() {
        const answerPromise = this.answerPromise = this.renderAnswer();
        this.setState({ ...this.state, answer: undefined });

        const answer = await answerPromise;
        if (this.answerPromise === answerPromise) {
            this.setState({ ...this.state, answer });
        }
    }

    render() {
        return (
            <div className={this.taskClassName}>
                {this.renderParameters()}

                {this.checkParameters() && (
                    <>
                        <hr />

                        {this.renderLoading()}
                    </>
                )}
            </div>
        );
    }

    protected abstract checkParameters(): boolean;
    protected abstract renderParameters(): React.ReactNode;
    protected abstract async renderAnswer(): Promise<React.ReactNode>;

    protected renderLoading(): React.ReactNode {
        const { answer } = this.state;

        return (
            <LoadingContainer loading={!answer}>
                {answer}
            </LoadingContainer>
        );
    }
}
