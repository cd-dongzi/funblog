'use client';
import { useMount } from '@funblog/hooks';
import { Button, Modal, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { useState } from 'react';
import { initData } from '@/api';

function Init() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ResultStatusType>('info');
  const mount = useMount(true);
  const onClick = async () => {
    setLoading(true);
    try {
      await initData();
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };
  if (!mount) return null;
  return (
    <Modal
      open={true}
      title="初始化数据"
      width="100%"
      style={{
        height: '100%',
      }}
      closable={false}
      footer={null}
    >
      <Result
        status={status}
        title="数据初始化"
        subTitle={
          status === 'success' ? '初始化成功' : status === 'error' ? '初始化失败' : '初始化部分数据给前端进行展示'
        }
        extra={
          <>
            {status === 'info' && (
              <Button type="primary" onClick={onClick} loading={loading}>
                点击初始化
              </Button>
            )}
            {status === 'success' && (
              <>
                <Button className="mr-4" type="dashed" href="/">
                  返回首页
                </Button>
                <Button type="primary" href="/login">
                  账号登录
                </Button>
              </>
            )}
            {status === 'error' && (
              <>
                <Button type="primary" onClick={onClick} loading={loading}>
                  重新初始化
                </Button>
              </>
            )}
          </>
        }
      />
    </Modal>
  );
}

export default Init;
