import React, { useState } from 'react';
import { Pill, Heading, Field } from 'rimble-ui';
import './AddChoice.css';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import TableList from '../TableList/index';
import UsualButton from '../UsualButton/index';
const AddChoice = props => {
  const [listChoice, setListChoice] = useState(['', '', '']);
  const form = Form.useForm();
  const handleChange = (e, indexItem) => {
    // const a = listChoice.map((item, index) => {
    //   console.log(index, ' ', indexItem);
    //   if (index === indexItem) {
    //     return e.target.value;
    //   } else {
    //     return item;
    //   }
    // });
    setListChoice(e.target.value);
  };

  const handleInput = e => {
    setInputValue(e.target.value);
    validateInput(e);
  };

  const handleFinish = values => {
    console.log(values);
  };

  const removeChoice = index => {
    const fixList = listChoice.filter((item, indexItem) => indexItem !== index);
    console.log(fixList, index);
    setListChoice(fixList);
  };

  const addMoreChoice = () => {
    const fixList = listChoice.concat('');
    setListChoice(fixList);
  };

  const AddChoiceHeader = () => (
    <div className="add-choice__header">
      <Heading as="h3" style={{ margin: 0 }}>
        Choices
      </Heading>
    </div>
  );

  const AddChoiceBody = () => (
    <>
      <div className="add-choice__body">
        <Form name="add-choice-form" onFinish={value => handleFinish(value)}>
          {listChoice.map((item, index) => (
            <div className="add-choice__input-wrapper">
              <Form.Item name={`add-choice-${index}`}>
                <Input className="add-choice__input" />
              </Form.Item>
              <Button
                type="link"
                icon={<CloseOutlined />}
                className="add-choice__input-remove"
                onClick={() => removeChoice(index)}
              />
            </div>
          ))}

          <UsualButton
            onClick={() => addMoreChoice()}
            text="Add More"
            width="100%"
          />
        </Form>
      </div>
    </>
  );
  return (
    <TableList
      headerRender={<AddChoiceHeader />}
      bodyRender={<AddChoiceBody />}
      isList
    />
  );
};
export default AddChoice;
