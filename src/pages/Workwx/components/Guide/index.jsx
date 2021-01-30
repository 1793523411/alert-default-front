import * as React from 'react';
import { Form, Input, Checkbox, DatePicker, Grid, Button, Tab } from '@alifd/next';
import styles from './index.module.scss';
import Img from '@icedesign/img';
import './index.css';

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

  const [imgUrl, setImgUrl] = React.useState('');
  const [tdata, settData] = React.useState({});
  const [mdata, semData] = React.useState({});
  const [imgdata, setimgData] = React.useState({});
  const [signT, setSignT] = React.useState(false);
  const [signM, setSignM] = React.useState(false);
  const [signI, setSignI] = React.useState(false);

  React.useEffect(() => {
    request.get('/workwx/getone').then((res) => {
      if (res) {
        setSignT(true);
        settData(res);
      }

      console.log(res);
    });
    request.get('/workwx/getonem').then((res) => {
      if (res) {
        setSignM(true);
        semData(res);
      }

      console.log(res);
    });
    request.get('/workwx/getonei').then((res) => {
      if (res) {
        setSignI(true);
        setImgUrl(res.picurl)
        setimgData(res);
      }

      console.log(res);
    });
  }, []);

  const handleSubmitT = (v) => {
    console.log(v);
    if (!signT) {
      console.log(v);
      request.post('/workwx/add', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/workwx/update', v).then((res) => {
        console.log(res);
      });
    }
  };
  const handleSubmitM = (v) => {
    console.log(v);
    if (!signM) {
      console.log(v);
      request.post('/workwx/addm', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/workwx/updatem', v).then((res) => {
        console.log(res);
      });
    }
  };
  const handleSubmitIT = (v) => {
    console.log(v);
    if (!signI) {
      console.log(v);
      request.post('/workwx/addi', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/workwx/updatei', v).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <div className={styles.container}>
      <Tab>
        <Tab.Item title="文本类型" key="1">
          <Form
            style={{ width: '60%', marginTop: '30px' }}
            {...formItemLayout}
            value={tdata}
          >
            <FormItem label="成员列表">
              <Input name="mentioned_list" placeholder="输入成员列表，空格隔开" />
            </FormItem>

            <FormItem label="手机号列表">
              <Input name="mentioned_mobile_list" placeholder="输入手机号列表，空格隔开" />
            </FormItem>
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="content"
              />
            </FormItem>
            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitT}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
        <Tab.Item title="markdown 类型" key="2" >
        <Form
            style={{ width: '60%', marginTop: '30px' }}
            {...formItemLayout}
            value={mdata}
          >
            <FormItem label="消息内容">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="content"
              />
            </FormItem>
            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitM}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
        <Tab.Item title="图文类型" key="3" >
        <Form
            style={{ width: '60%', marginTop: '30px' }}
            {...formItemLayout}
            value={imgdata}
          >
            <FormItem label="标题">
              <Input name="title" placeholder="请输入图文标题" />
            </FormItem>

            <FormItem label="跳转链接">
              <Input name="url" placeholder="请输入点击跳转后的链接" />
            </FormItem>
            <FormItem label="图片链接">
              <Input name="picurl" placeholder="请输入图片链接" onChange={(e) => {
              console.log(e);
              setImgUrl(e);
            }}/>
              {imgUrl && (
            <Img
              enableAliCDNSuffix
              width={400}
              height={200}
              src={imgUrl}
              type="cover"
              style={{ border: '1px solid #ccc', marginTop: '10px' }}
            />
          )}
            </FormItem>
            <FormItem label="描述">
              <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 5, maxRows: 100 }}
                placeholder="输入文本内容"
                name="description"
              />
            </FormItem>
            <FormItem label=" ">
              <Form.Submit onClick={handleSubmitIT}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default Guide;
