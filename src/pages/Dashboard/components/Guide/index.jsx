import * as React from 'react';
import { Button } from '@alifd/next';
import styles from './index.module.scss';

const Guide = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>欢迎使用 create-alert！</h2>

      <p className={styles.description}>这里是一个后台管理系统!</p>

      <div className={styles.action}>
        <a
          href="http://alert-doc.ygjie.icu/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginRight: 20,
          }}
        >
          <Button type="primary" size="large">
            使用文档
          </Button>
        </a>
        <a href="https://github.com/1793523411/create-alert" target="_blank" rel="noopener noreferrer">
          <Button type="secondary" size="large">
            GitHub
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Guide;
