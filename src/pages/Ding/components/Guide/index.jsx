import * as React from 'react';
import { Form, Input, Checkbox, DatePicker, Grid, Button, Tab, Switch, Table } from '@alifd/next';
import styles from './index.module.scss';
import Img from '@icedesign/img';

import { request } from 'ice';

const formItemLayout = {
  labelCol: {
    fixedSpan: 18,
  },
  wrapperCol: {
    span: 14,
  },
};

const { Row, Col } = Grid;
const FormItem = Form.Item;

const Guide = () => {
  const [textdata, settextData] = React.useState({});
  const [textChange, settextChange] = React.useState(false);
  const [signText, setsignText] = React.useState(false);

  const [markdata, setMarkData] = React.useState({});
  const [markChange, setMarkChange] = React.useState(false);
  const [signMark, setsignMark] = React.useState(false);

  const [linkdata, setLinkData] = React.useState({});
  const [linkimgUrl, setlinkimgUrl] = React.useState('');
  const [signLink, setsignLink] = React.useState(false);

  const [acarddata, setacardData] = React.useState({});
  const [signAcard, setsignAcard] = React.useState(false);

  const [Fcarddata, setDcardData] = React.useState({});
  const [FimgUrl, setFimgUrl] = React.useState('');
  const [FAlldata, setFAllData] = React.useState([]);

  React.useEffect(() => {
    request.get('/ding/getonetext').then((res) => {
      if (res) {
        setsignText(true);
        settextChange(res.isAtAll);
        settextData(res);
      }
      console.log(res);
    });
    request.get('/ding/getonemark').then((res) => {
      if (res) {
        setsignMark(true);
        setMarkChange(res.isAtAll);
        setMarkData(res);
      }
      console.log(res);
    });
    request.get('/ding/getonelink').then((res) => {
      if (res) {
        setsignLink(true);
        setlinkimgUrl(res.picUrl);
        setLinkData(res);
      }
      console.log(res);
    });
    request.get('/ding/getoneacard').then((res) => {
      if (res) {
        setsignAcard(true);
        setacardData(res);
      }
      console.log(res);
    });
    request.get('/ding/getfcard').then((res) => {
      setFAllData(res);
      console.log(res);
    });
  }, []);
  const handleSubmitText = (v) => {
    console.log(v);
    if (!signText) {
      console.log(v);
      request.post('/ding/addtext', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/ding/updatetext', v).then((res) => {
        console.log(res);
      });
    }
  };

  const handleSubmitMark = (v) => {
    console.log(v);
    if (!signMark) {
      console.log(v);
      request.post('/ding/addmark', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/ding/updatemark', v).then((res) => {
        console.log(res);
      });
    }
  };

  const handleSubmitLink = (v) => {
    console.log(v);
    if (!signLink) {
      console.log(v);
      request.post('/ding/addlink', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/ding/updatelink', v).then((res) => {
        console.log(res);
      });
    }
  };

  const handleSubmitAcard = (v) => {
    console.log(v);
    if (!signAcard) {
      console.log(v);
      request.post('/ding/addacard', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/ding/updateacard', v).then((res) => {
        console.log(res);
      });
    }
  };

  const handleSubmitFcard = (v) => {
    console.log(v);
    request.post('/ding/addfcard', v).then((res) => {
      console.log(res);
      request.get('/ding/getfcard').then((res) => {
        setFAllData(res);
      });
    });
  };

  const onChange = (checked) => {
    settextChange(checked);
  };

  const onChangemark = (checked) => {
    setMarkChange(checked);
  };

  const render = (value, index, record) => {
    return (
      <Button
        onClick={() => {
          console.log(record.id);
          request.post('/ding/delfcard', { id: record.id }).then((res) => {
            console.log(res);
            request.get('/ding/getfcard').then((res) => {
              setFAllData(res);
            });
          });
        }}
      >
        删除
      </Button>
    );
  };

  const renderimg = (v, i, record) => {
    return (
      <Img
        enableAliCDNSuffix
        width={300}
        height={200}
        src={record.picURl}
        type="cover"
        style={{ border: '1px solid #ccc', marginTop: '10px' }}
      />
    );
  };

  const renderlink = (v, i, record) => {
    return <a href={record.messageURL} style={{cursor: 'pointer',}}>{record.messageURL}</a>
  }

  return (
    <div className={styles.container}>
      <Tab>
        <Tab.Item title="text" key="1">
          <Form style={{ width: '60%', marginTop: '30px' }} {...formItemLayout} value={textdata}>
            <FormItem label="手机号">
              <Input name="atMobiles" placeholder="输入要提醒的手机号，多个请用空格分隔" />
            </FormItem>
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="content"
              />
            </FormItem>
            <FormItem label="是否@全体">
              <Row>
                <FormItem style={{ marginRight: 10, marginBottom: 0 }}>
                  <Switch checked={textChange} onChange={onChange} name="isAtAll" />
                </FormItem>
              </Row>
            </FormItem>

            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitText}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
        <Tab.Item title="link" key="2">
          <Form style={{ width: '60%', marginTop: '30px' }} {...formItemLayout} value={linkdata}>
            <FormItem label="图片链接">
              <Input
                name="picUrl"
                placeholder="输入图片地址"
                onChange={(e) => {
                  console.log(e);
                  setlinkimgUrl(e);
                }}
              />
              {linkimgUrl && (
                <Img
                  enableAliCDNSuffix
                  width={400}
                  height={200}
                  src={linkimgUrl}
                  type="cover"
                  style={{ border: '1px solid #ccc', marginTop: '10px' }}
                />
              )}
            </FormItem>
            <FormItem label="资源链接">
              <Input name="messageUrl" placeholder="输入资源地址" />
            </FormItem>
            <FormItem label="标题">
              <Input name="title" placeholder="输入标题" />
            </FormItem>
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="text"
              />
            </FormItem>

            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitLink}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
        <Tab.Item title="markdown" key="3">
          <Form style={{ width: '60%', marginTop: '30px' }} {...formItemLayout} value={markdata}>
            <FormItem label="手机号">
              <Input name="atMobiles" placeholder="输入要提醒的手机号，多个请用空格分隔" />
            </FormItem>
            <FormItem label="标题">
              <Input name="title" placeholder="输入要标题，多个请用空格分隔" />
            </FormItem>
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="text"
              />
            </FormItem>
            <FormItem label="是否@全体">
              <Row>
                <FormItem style={{ marginRight: 10, marginBottom: 0 }}>
                  <Switch checked={markChange} onChange={onChangemark} name="isAtAll" />
                </FormItem>
              </Row>
            </FormItem>

            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitMark}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
        <Tab.Item title="actionCard" key="4">
          <Form style={{ width: '60%', marginTop: '30px' }} {...formItemLayout} value={acarddata}>
            <FormItem label="标题">
              <Input name="title" placeholder="输入首屏会话透出的展示内容" />
            </FormItem>
            <FormItem label="链接文字">
              <Input name="singleTitle" placeholder="输入单个按钮的标题" />
            </FormItem>
            <FormItem label="链接">
              <Input name="singleURL" placeholder="输入单个按钮的跳转链接" />
            </FormItem>
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="text"
              />
            </FormItem>

            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitAcard}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
        <Tab.Item title="feedCard" key="5">
          <Form style={{ width: '60%', marginTop: '30px' }} {...formItemLayout} value={Fcarddata}>
            <FormItem label="标题">
              <Input name="title" placeholder="输入首屏会话透出的展示内容" />
            </FormItem>
            <FormItem label="图片地址">
              <Input
                name="picURl"
                placeholder="输入图片地址"
                onChange={(e) => {
                  console.log(e);
                  setFimgUrl(e);
                }}
              />
              {FimgUrl && (
                <Img
                  enableAliCDNSuffix
                  width={400}
                  height={200}
                  src={FimgUrl}
                  type="cover"
                  style={{ border: '1px solid #ccc', marginTop: '10px' }}
                />
              )}
            </FormItem>
            <FormItem label="链接">
              <Input name="messageURL" placeholder="输入资源链接" />
            </FormItem>
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="text"
              />
            </FormItem>

            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitFcard}>提交</Form.Submit>
            </FormItem>
          </Form>
          <Table dataSource={FAlldata}>
            <Table.Column title="title" dataIndex="title" />
            {/* <Table.Column title="picURl" dataIndex="picURl" /> */}
            <Table.Column cell={renderimg} />
            <Table.Column title="text" dataIndex="text" />

            <Table.Column cell={renderlink} width={100} resizable={true} />
            <Table.Column cell={render} />
          </Table>
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default Guide;
