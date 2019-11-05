import * as React from 'react';
import { Field } from 'formik';

// @flow
type Props = {
  _id: string,
  title: string,
  options: {
    _id: string,
    content: string
  }[]
};

class MultiChoice extends React.Component<Props> {
  render() {
    const { title, options, _id } = this.props;
    return (
        <div>
          <h3 className="question-title">{title}</h3>
          <div>
          {options.map((option, index) => {
            return (
                <div key={index} className="radio">
                  <Field id={`${index}-multi-option`} component="input" type="radio" name={_id} value={option._id} />
                  <label htmlFor={`${index}-multi-option`}>
                    
                    {option.content}
                  </label>
                </div>
            )
          })}
          </div>
        </div>
    );
  }
}

export default MultiChoice;
