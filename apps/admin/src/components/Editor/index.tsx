import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight-ssr';
import math from '@bytemd/plugin-math-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid';
import { Editor as IEditor } from '@bytemd/react';
import { Spin } from 'antd';
import 'bytemd/dist/index.css';
import cls from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadImage } from '@/components/Upload';
import { getResourceUrl } from '@/utils';
import { cn } from './locales';

// import '../../style/github-markdown.css';
// import '../../style/code-light.css';
// import '../../style/code-dark.css';
// import '../../style/custom-container.css';
import { customCodeBlock } from './plugins/codeBlock';
import { customContainer } from './plugins/customContainer';
import { emoji } from './plugins/emoji';
// import './index.less';
import { Heading } from './plugins/heading';
// import { historyIcon } from './plugins/history';
// import { imgUploadPlugin } from './plugins/imgUpload';
// import { insertMore } from './plugins/insertMore';
import { LinkTarget } from './plugins/linkTarget';
import rawHTML from './plugins/rawHTML';
import styles from './style.module.css';

const sanitize = (schema: any) => {
  schema.protocols.src.push('data');
  schema.tagNames.push('center');
  schema.tagNames.push('iframe');
  schema.tagNames.push('script');
  schema.attributes['*'].push('style');
  schema.attributes['*'].push('src');
  schema.attributes['*'].push('scrolling');
  schema.attributes['*'].push('border');
  schema.attributes['*'].push('frameborder');
  schema.attributes['*'].push('framespacing');
  schema.attributes['*'].push('allowfullscreen');
  schema.strip = [];
  return schema;
};

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
}
function Editor({ value, onChange }: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    ref.current?.querySelector('.markdown-body')?.classList.add('md-container');
  }, []);
  const plugins = useMemo(() => {
    return [
      customContainer(),
      gfm({ locale: cn }),
      highlight(),
      frontmatter(),
      math({ locale: cn }),
      mediumZoom(),
      mermaid({ locale: cn }),
      // imgUploadPlugin(setLoading),
      emoji(),
      // insertMore(),
      rawHTML(),
      // historyIcon(),
      Heading(),
      customCodeBlock(),
      LinkTarget(),
    ];
  }, []);
  return (
    <Spin spinning={loading}>
      <div className={cls(styles.editor)} ref={ref}>
        <IEditor
          value={value}
          plugins={plugins}
          locale={cn}
          sanitize={sanitize}
          onChange={onChange}
          uploadImages={async (files: File[]) => {
            setLoading(true);
            try {
              const urls = await Promise.all(files.map((file) => uploadImage(file)));
              return urls.map((url) => ({
                url: getResourceUrl(url),
              }));
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>
    </Spin>
  );
}

export default Editor;
