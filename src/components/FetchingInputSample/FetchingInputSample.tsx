import React from 'react';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import { InputText } from 'primereact/inputtext';

import { ValidationIcon } from '../ValidationIcon/ValidationIcon';

export interface FetchingInputSampleProps {

    onChange(sample?: number[]): void;
}

interface FetchingInputSampleState {

    url: string;
    loading: boolean;
    sample?: number[];
}

export class FetchingInputSample extends React.Component<FetchingInputSampleProps, FetchingInputSampleState> {

    private previousFetch: number = Date.now();

    private urlRegex = /^[^:/?#]+:\/\/[^/?#]*[^?#]*(\?([^#]*))?(#(.*))?$/;
    private proxyUrl = 'https://proxy.byprogminer.ru/?';

    state: FetchingInputSampleState = {
        url: '',
        loading: false
    };

    componentDidUpdate(
        prevProps: Readonly<FetchingInputSampleProps>,
        prevState: Readonly<FetchingInputSampleState>,
        snapshot?: any
    ) {
        if (!isEqual(omit(this.state, ['loading', 'sample']), omit(prevState, ['loading', 'sample']))) {
            this.reload();
        }
    }

    private reload() {
        const { url } = this.state;

        (async () => {
            try {
                if (this.urlRegex.test(url)) {
                    await new Promise(resolve =>
                        setTimeout(resolve, Math.max(0, this.previousFetch + 100 - Date.now())));

                    this.previousFetch = Date.now();
                    const response = await fetch(this.proxyUrl + url);

                    if (response.ok) {
                        const sampleText = await response.text();
                        const sample = sampleText.split('\n')
                            .map(s => s.trim()).filter(Boolean).map(Number)
                            .filter(v => !isNaN(v)).sort((a, b) => a - b);

                        if (sample.length > 0) {
                            if (this.state.url === url) {
                                this.setState({ ...this.state, loading: false, sample });
                                this.props.onChange(sample);
                            }

                            return;
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }

            this.setState({ ...this.state, loading: false, sample: undefined });
            this.props.onChange(undefined);
        })();
    }

    private onUrlChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            url: e.currentTarget.value.trim(),
            loading: true
        });
    }

    private onIconClick() {
        this.setState({ ...this.state, loading: true });
        this.reload();
    }

    render() {
        const { url, loading, sample } = this.state;

        return (
            <>
                <InputText placeholder="URL-адрес выборки" value={url} onChange={this.onUrlChange.bind(this)} />

                <span className="p-inputgroup-addon">
                    <ValidationIcon clickable={this.urlRegex.test(url)} valid={loading ? undefined : !!sample}
                                    onClick={this.onIconClick.bind(this)} />
                </span>
            </>
        )
    }
}
