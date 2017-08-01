import React from 'react';
import ReactDOM from 'react-dom';
import ComponentDocs from '../../ComponentDocs';
import ExampleSection from '../../ExampleSection';
// autogenerated docs data containing descriptions of this component's props
import propDocs from './propDocs.json';

const examples = [
  {
    id: "basic",
    label: "Basic Histogram",
    codeText: require('raw-loader!./examples/Histogram.js.example'),
  },
];

export default class HistogramExamples extends React.Component {
  render() {
    return <ComponentDocs name="Histogram" propDocs={propDocs}>

      {/* documentation goes here. intersperse docs with examples or leave examples loop below */}

      {examples.map(example => {
        return <ExampleSection {...example} key={example.id} />;
      })}
    </ComponentDocs>;
  }
}
