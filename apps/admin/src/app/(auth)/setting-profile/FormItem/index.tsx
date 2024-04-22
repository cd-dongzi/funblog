import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useState } from 'react';

function FormItem({
  label,
  children,
  onCancel,
  onConfirm,
  hideAction,
  canEdit,
}: {
  label: string;
  onCancel?: () => void;
  onConfirm?: () => Promise<any>;
  children: (props: { disabled: boolean; loading: boolean }) => React.ReactNode;
  hideAction?: boolean;
  canEdit?: boolean;
}) {
  const [disabled, setDisabled] = useState(canEdit !== true);
  const [loading, setLoading] = useState(false);
  return (
    <div className="mb-8 flex">
      <Row className="max-w-[400px] flex-1">
        <Col span={6}>
          <span className="[line-height:32px]">{label}</span>
        </Col>
        <Col span={18}>{children({ disabled, loading })}</Col>
      </Row>
      {!hideAction && (
        <div className="mb-[--ant-form-item-margin-bottom] ml-4 shrink-0">
          {disabled ? (
            <Button type="text" icon={<EditOutlined />} onClick={() => setDisabled(false)}></Button>
          ) : (
            <>
              <Button
                className="mr-2"
                onClick={() => {
                  setDisabled(true);
                  onCancel?.();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                loading={loading}
                onClick={async () => {
                  try {
                    setLoading(true);
                    await onConfirm?.();
                  } finally {
                    setLoading(false);
                    setDisabled(true);
                  }
                }}
              >
                确定
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FormItem;
