import React, { useState, useContext } from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
import Web3 from 'web3';

import ContractContext from 'context/ContractContext';
import './CreateSpacePage.css';
import { Redirect, useHistory } from 'react-router-dom';

function CreateProposalPage() {
  const [form] = Form.useForm();
  const { account, governance } = useContext(ContractContext);
  const [created, setCreated] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const createSpace = (values) => {
    governance.methods.newSpace(
        Web3.utils.randomHex(32),
        Web3.utils.asciiToHex(values.name),
        Web3.utils.asciiToHex(values.symbol),
        values.token,
        values.strategy || '',
      )
      .send({ from: account })
      .on('receipt', () => {
        setCreated(true);
      })
      .on('error', (error, receipt) => {
        window.alert(error);
      })
  };

  return created ? <Redirect to="/"/> : (
    <>
      <div className="create-space-page">
        <Form
          form={form}
          layout={'vertical'}
          name="control-hooks"
          onFinish={values => createSpace(values)}
        >
          <Row>
            <Col span={24} xxl={12}>
              <Form.Item
                layout={layout}
                name="name"
                label="Name"
                rules={[{ required: true }]}
                placeholder={'The space name'}
              >
                <Input style={{ height: 50, borderRadius: 50 }} />
              </Form.Item>
              <Form.Item
                layout={layout}
                name="symbol"
                label="Symbol"
                rules={[{ required: true }]}
                placeholder={'The token symbol'}
              >
                <Input style={{ height: 50, borderRadius: 50 }} />
              </Form.Item>
              <Form.Item
                layout={layout}
                name="token"
                label="Token address"
                rules={[{ required: true }]}
                placeholder={'The token address'}
              >
                <Input style={{ height: 50, borderRadius: 50 }} />
              </Form.Item>
              <Form.Item
                layout={layout}
                name="strategy"
                label="The strategy address (put empty for default strategy)"
                rules={[{ required: false }]}
                placeholder={'The strategy address (put empty if you want to use default strategy)'}
              >
                <Input style={{ height: 50, borderRadius: 50 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Button type="primary" className="submit-button" htmlType="submit">
              Create space
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default CreateProposalPage;
