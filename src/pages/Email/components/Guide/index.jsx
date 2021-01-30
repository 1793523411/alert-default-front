import * as React from 'react';
import { Form, Input, Checkbox, DatePicker, Grid } from '@alifd/next';
import Img from '@icedesign/img';
import styles from './index.module.scss';

import { request } from 'ice';

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 18,
  },
  wrapperCol: {
    span: 14,
  },
};

const Guide = () => {
  const [imgUrl, setImgUrl] = React.useState('');
  const [data, setData] = React.useState({});
  const [sign, setSign] = React.useState(false);
  React.useEffect(() => {
    request.get('/email/getone').then((res) => {
      if (res) {
        setSign(true);
        setData(res);
        setImgUrl(res.img);
      }

      console.log(res);
    });
  }, []);

  const handleSubmit = (v) => {
    if (!sign) {
      console.log(v);
      request.post('/email/add', v).then((res) => {
        console.log(res);
      });
    } else {
      console.log(v);
      request.post('/email/update', v).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <div className={styles.container}>
      <Form style={{ width: '60%', marginTop: '30px' }} {...formItemLayout} value={data}>
        <FormItem label="图片链接">
          <Input
            name="img"
            placeholder="输入图片地址"
            onChange={(e) => {
              console.log(e);
              setImgUrl(e);
            }}
          />
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
        <FormItem label="邮件标题">
          <Input name="title" placeholder="输入邮件标题" />
        </FormItem>

        <FormItem label="选择日期">
          <Row>
            <FormItem style={{ marginRight: 10, marginBottom: 0 }}>
              <DatePicker defaultValue="2020-02-1" name="date" />
            </FormItem>
          </Row>
        </FormItem>
        <FormItem label="邮件内容">
          <Input.TextArea aria-label="auto height" autoHeight={{ minRows: 5, maxRows: 100 }} name="text" />
        </FormItem>
        <FormItem label=" ">
          <Form.Submit onClick={handleSubmit}>提交</Form.Submit>
        </FormItem>
      </Form>
    </div>
  );
};

export default Guide;
