import React, { useState, useContext, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import ProposalList from '../../components/ProposalList/index';
import AddChoice from '../../components/AddChoice/index';
import { Row, Col, Input, Button, Form, DatePicker } from 'antd';
import { Heading } from 'rimble-ui';
import './CreateProposalPage.css';
import { CloseOutlined } from '@ant-design/icons';
import UsualButton from '../../components/UsualButton/index';
import Web3 from 'web3';
import fleek from '@fleekhq/fleek-storage-js';
import ContractContext from 'context/ContractContext';
import moment from 'moment';
import { Redirect } from 'react-router';

function CreateProposalPage(props) {
  const [form] = Form.useForm();
  const [listChoice, setListChoice] = useState(['', '', '']);
  const [created, setCreated] = useState(false);
  const { account, governance } = useContext(ContractContext);
  const spaceId = props.match.params.id;
  const space = props.location.state.space;
  const to =  {
    pathname: `/space/${spaceId}`,
    state: {space}
  }

  const removeChoice = index => {
    const fixList = listChoice.filter((item, indexItem) => indexItem !== index);
    setListChoice(fixList);
  };

  const addMoreChoice = () => {
    const fixList = listChoice.concat('');
    setListChoice(fixList);
  };

  const createProposal = async values => {
    const choices = listChoice.map((item, index) => values[`add-choice-${index}`]);
    const submitValue = {
      startTime: values.dateStart,
      endTime: values.dateEnd,
      description: values.description,
      title: values.question,
      blockNumber: 123,
      choices: choices,
    };
    let id = Web3.utils.randomHex(32);

    let detail = JSON.stringify({
      creator: account,
      version: '1.0.0',
      type: 'proposal',
      proposal: submitValue,
    });

    let input = {
      apiKey: 'oXUQSeADxx68n4FS6XUiTg==',
      apiSecret: 'ifJEyPgAUdSFBg9gvWKLL1x42krnmdanRXMXTGVk4pQ=',
      key: `proposals/${id}`,
      data: detail,
    };

    const result = await fleek.upload(input);
    governance.methods
      .newProposal(
        spaceId,
        id,
        Web3.utils.asciiToHex(result.hash),
        moment(values.dateStart).unix(),
        moment(values.dateEnd).unix(),
        123,
        choices.length,
      )
      .send({ from: account })
      .on('receipt', () => {
        setCreated(true);
      })
      .on('error', (error, receipt) => {
        window.alert(error);
      })
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return created ? <Redirect to={to} /> : (
    <>
      <div className="create-proposal-page">
        <Form
          form={form}
          layout={'vertical'}
          name="control-hooks"
          onFinish={values => createProposal(values)}
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
