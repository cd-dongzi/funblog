import { BytemdPlugin } from 'bytemd';
import rehypeRaw from 'rehype-raw';
export default function rawHTML(): BytemdPlugin {
  return {
    rehype: (processor) => processor.use(rehypeRaw as any),
  };
}
