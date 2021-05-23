import React, { useState } from 'react';
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

  // Broken code pls fix it
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Governance.networks[networkId];
    if (networkData) {
      const contract = new web3.eth.Contract(
        Governance.abi,
        networkData.address,
      );
      this.setState({ contract });
    } else {
      window.alert('Smart contract not deployed to detected network.');
    }
  };

  const createProposal = async () => {
    console.log('Submitting file to ipfs...');
    let id = Web3.utils.randomHex(32);

    let detail = JSON.stringify({
      creator: this.state.account,
      version: '1.0.0',
      type: 'proposal',
      proposal: {
        title: this.state.title,
        description: this.state.desc,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        blockNumber: this.state.blockNumber,
        choices: this.state.choices,
      },
    });

    let input = {
      apiKey: 'oXUQSeADxx68n4FS6XUiTg==',
      apiSecret: 'ifJEyPgAUdSFBg9gvWKLL1x42krnmdanRXMXTGVk4pQ=',
      key: `proposals/${id}`,
      data: detail,
    };

    const result = await fleek.upload(input);
    console.log('Ipfs result', result);
    this.state.contract.methods
      .newProposal(
        Web3.utils.asciiToHex(this.state.spaceKey),
        id,
        Web3.utils.asciiToHex(result.hash),
        this.state.startTime,
        this.state.endTime,
        this.state.blockNumber,
        this.state.choices.length,
      )
      .send({ from: this.state.account })
      .then(r => {
        return this.setState({ hash: result.hash });
      });
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
