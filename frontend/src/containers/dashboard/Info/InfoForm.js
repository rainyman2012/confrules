import React from "react";
import { Steps, message } from 'antd';
import SubSection from './subforms/SubSection'
import Personal from './Personal/Personal'
import "./InfoForm.css"
const { Step } = Steps;
const stepLength = 4;

function getSteps(nextCallback, prevCallback, getCurrent, stepLength) {
  const steps = [
    {
      title: 'نمایندگی ها',
      content: <SubSection next={nextCallback} prev={prevCallback} getCurrentSteps={getCurrent} stepLength={stepLength} />,
    },
    {
      title: 'اطلاعات شخصی',
      content: <Personal next={nextCallback} prev={prevCallback} getCurrentSteps={getCurrent} stepLength={stepLength} />,
    },
    {
      title: 'سند همکاری',
      content: 'نمایش سند همکاری',
    }
  ];
  return steps;
}

class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  getCurrentSteps = () => {
    return this.state.current
  }

  next = () => {
    console.log("check next", this.state.check);
    const current = this.state.current + 1;
    this.setState({ current });

  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const steps = getSteps(this.next, this.prev, this.getCurrentSteps, stepLength);
    console.log("current", current);

    return (
      <div style={{ direction: "ltr" }}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </div>
    );
  }
}

export default InfoForm;