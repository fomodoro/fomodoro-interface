import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import ProposalList from '../../components/ProposalList/index';
import AddChoice from '../../components/AddChoice/index';
import { Row, Col, Input, Button, Form, DatePicker } from 'antd';
import { Heading } from 'rimble-ui';
import './CreateProposalPage.css';
import { CloseOutlined } from '@ant-design/icons';
import UsualButton from '../../components/UsualButton/index';

function CreateProposalPage() {
  const [form] = Form.useForm();
  const [listChoice, setListChoice] = useState(['', '', '']);
  const list = [
    {
      id: 1,
      status: 'active',
      title: 'It suggest to gas volumne',
      description: 'End in 6 month',
    },
    {
      id: 2,
      status: 'closed',
      title: 'It suggest to gas volumne',
      description: 'End in 6 month',
    },
    {
      id: 3,
      status: 'pending',
      title: 'It suggest to gas volumne',
      description: 'End in 6 month',
    },
  ];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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

  return (
    <>
      <div className="create-proposal-page">
        <Form
          form={form}
          layout={'vertical'}
          name="control-hooks"
          onFinish={values => console.log(values)}
        >
          <Row>
            <Col span={24} xxl={12}>
              <Form.Item
                layout={layout}
                name="question"
                label="Question"
                rules={[{ required: true }]}
                placeholder={'Question'}
              >
                <Input style={{ height: 50, borderRadius: 50 }} />
              </Form.Item>
              <Form.Item
                layout={layout}
                name="description"
                label="Description"
                rules={[{ required: true }]}
                placeholder={'What is your proposal'}
              >
                <Input style={{ height: 50, borderRadius: 50 }} />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    layout={layout}
                    name="dateStart"
                    label="Select Date start"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      style={{ width: '90%', height: 50, borderRadius: 50 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    layout={layout}
                    name="dateEnd"
                    label="Select Date end"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      style={{ width: '90%', height: 50, borderRadius: 50 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24} xxl={12}>
              <div className="add-choice__body">
                <Heading as={'h2'} style={{ marginBottom: 20 }}>
                  Choices
                </Heading>
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

                {/* <UsualButton text="Add More" width="100%" /> */}
                <Button
                  type="primary"
                  className="add-choice-button"
                  onClick={() => addMoreChoice()}
                >
                  Add choice
                </Button>
              </div>
            </Col>
          </Row>
          <Row justify="center">
            <Button type="primary" className="submit-button" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default CreateProposalPage;
