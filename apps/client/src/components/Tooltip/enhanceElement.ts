import React from 'react';

/**
 * 用来解决function component没有ref的问题, 被这个组件包括后可以获得对应的ref
 */
// class EnhanceWrapper extends React.Component<Record<string, any>> {
//   render() {
//     return this.props.children;
//   }
// }
export interface EnhanceFuncProps {
  onClick?: (e: React.MouseEventHandler) => void;
  onChange?: (e: React.MouseEventHandler) => void;
  onMouseOver?: (e: React.MouseEventHandler) => void;
  onMouseLeave?: (e: React.MouseEventHandler) => void;
  onMouseEnter?: (e: React.MouseEventHandler) => void;
}

export interface EnhanceProps extends EnhanceFuncProps {
  [propsName: string]: any;
}
const availableEventProps = new Set(['onClick', 'onChange', 'onMouseEnter', 'onMouseOver', 'onMouseLeave']);

export function enhanceProps(options: EnhanceProps, options1: EnhanceProps) {
  const enhanceProps = { ...options };
  for (const i in options1) {
    if (availableEventProps.has(i)) {
      enhanceProps[i] = (...arg: any) => {
        options[i]?.(...arg);
        options1[i]?.(...arg);
      };
    } else {
      // className单独处理的情况不是覆盖, 是追加
      if (i === 'className') {
        enhanceProps[i] = enhanceProps.className
          ? `${enhanceProps.className} ${options1.className}`
          : options1.className;
      } else {
        enhanceProps[i] = options1[i];
      }
    }
  }
  return enhanceProps;
}

// 强化传入的react元素，对这个元素增加增量的props属性
export function enhanceElement(element: React.ReactElement, options: EnhanceProps) {
  if (!element) {
    return;
  }
  // const props = enhanceProps(element.props, options);
  const enhanceProps = { ...element.props };
  for (const i in options) {
    if (availableEventProps.has(i)) {
      enhanceProps[i] = (...arg: any) => {
        if (element.props[i]) {
          element.props[i](...arg);
        }
        options[i](...arg);
      };
    } else {
      // className单独处理的情况不是覆盖, 是追加
      if (i === 'className') {
        enhanceProps[i] = enhanceProps.className ? `${enhanceProps.className} ${options.className}` : options.className;
      } else {
        enhanceProps[i] = options[i];
      }
    }
  }

  return React.createElement(element.type, enhanceProps);
  // // 防止拿不到ref
  // if (getRef) {
  //   return React.createElement(EnhanceWrapper, { ref: getRef }, React.createElement(element.type, enhanceProps));
  // } else {
  //   return React.createElement(element.type, enhanceProps);
  // }
}
