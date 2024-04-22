'use client';
import { Icon } from '@funblog/components';
import cls from 'classnames';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import InputLabel from '@/components/InputLabel';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import Select from '@/components/Select';
import styles from './style.module.css';

export interface ModalFormRef {
  reset: () => void;
}

type Field = {
  label: string;
  name: string;
  required?: boolean;
  icon?: string;
  disabled?: boolean;
  showRequiredLabel?: boolean;
  validator?: (value: string, item: Field) => Promise<any>;
} & (
  | {
      type: 'select';
      options: { label: string; value: string | number }[];
    }
  | {
      type: 'input' | 'password';
    }
);
export type ModalFormProps<T = Record<string, any>> = {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  initState?: T;
  className?: string;
  onConfirm?: (form: T) => Promise<any> | void;
  confirmText?: string;
  showRequiredLabel?: boolean;
  fields?: Field[];
  renderFooter?: (data: { dom: React.ReactNode; onConfirm: () => Promise<any> }) => React.ReactNode;
  renderContent?: (data: { onClose: () => void }) => React.ReactNode;
  formRef?: React.MutableRefObject<ModalFormRef | undefined>;
};

function ModalForm<T extends Record<string, any>>({
  isOpen = false,
  title,
  fields,
  className,
  initState = {} as T,
  onClose,
  onConfirm,
  confirmText = '确认',
  renderFooter,
  renderContent,
  showRequiredLabel = false,
  formRef,
}: ModalFormProps<T>) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, any>>(initState);
  const setVal = (val: string | number, attr: string) => {
    setForm((prev) => ({
      ...prev,
      [attr]: val,
    }));
  };

  const reset = useCallback(() => {
    setForm(initState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(formRef, () => ({
    reset,
  }));

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleConfirm = async () => {
    const requiredList = fields?.filter((item) => item.required || item.validator) || [];
    for (const item of requiredList) {
      const val = form[item.name];
      if (item.required && !val) {
        Notification.error(`${item.label}不能为空`);
        return;
      }
      if (item.validator && val) {
        try {
          await item.validator?.(val, item);
        } catch (error: any) {
          Notification.error(error?.message);
          return;
        }
      }
    }
    setLoading(true);
    try {
      return onConfirm?.(form as T);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      renderContent={({ onClose }) => {
        const _onConfirm = async () => {
          const bol = await handleConfirm();
          bol && onClose();
        };
        const dom = (
          <button
            className={cls('btn-clear background-to-primary-light transition-all-2', styles.btn, {
              [styles.loading]: loading,
            })}
            onClick={_onConfirm}
          >
            {loading ? <Icon name="loading" /> : confirmText}
          </button>
        );
        return (
          <div className={cls(styles.box, className)}>
            <Icon name="close" className={styles.close} onClick={onClose} />
            <div className={styles.nav}>{title}</div>
            {renderContent ? (
              renderContent({ onClose })
            ) : (
              <div className={styles.main}>
                {fields?.map((item) => {
                  const _showRequiredLabel =
                    item.showRequiredLabel === undefined ? showRequiredLabel : item.showRequiredLabel;
                  if (item.type === 'select') {
                    return (
                      <Select
                        key={item.name}
                        value={form[item.name]}
                        required={item.required}
                        showRequiredLabel={_showRequiredLabel}
                        options={item.options}
                        className={styles.input}
                        onChange={(val) => {
                          setVal(val, item.name);
                        }}
                      />
                    );
                  }
                  return (
                    <InputLabel
                      key={item.name}
                      required={item.required}
                      showRequiredLabel={_showRequiredLabel}
                      className={styles.input}
                      value={form[item.name]}
                      onChange={(val) => {
                        setVal(val, item.name);
                      }}
                      prefixIcon={item.icon}
                      placeholder={item.label}
                      type={item.type}
                      disabled={item.disabled}
                    />
                  );
                })}
                {renderFooter ? (
                  renderFooter({
                    dom,
                    onConfirm: _onConfirm,
                  })
                ) : (
                  <div className="flex items-center">{dom}</div>
                )}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

export default ModalForm;
