import { Checkbox, List as AntList, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useRef, useState } from 'react';

type Val = string | number;
type Item = { label: string; value: Val };

type Query = {
  keyword: string;
};
export interface ListProps {
  value?: Val[];
  request?: (query: Query) => Promise<Item[]>;
  onChange?: (value: Val[]) => void;
}

function convert(value?: Val[]) {
  if (!value) return {};
  return value.reduce(
    (prev, cur) => {
      prev[cur] = true;
      return prev;
    },
    {} as Record<string, any>,
  );
}
function List({ value, request, onChange }: ListProps) {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState<Query>({
    keyword: '',
  });
  const [checkedObj, setCheckedObj] = useState(convert(value));
  const prosRef = useRef({
    request,
  });
  prosRef.current.request = request;
  const onSearch = (val: string) => {
    onChange?.([]);
    setQuery((prev) => ({
      ...prev,
      keyword: val,
    }));
  };
  const handleChange = (val: CheckboxChangeEvent, item: Item) => {
    const id = item.value;
    const checked = val.target.checked;
    const obj = { ...checkedObj };
    obj[id] = checked;
    onChange?.(Object.keys(obj).filter((v) => obj[v]));
  };
  useEffect(() => {
    const request = prosRef.current.request;
    if (request) {
      setLoading(true);
      request(query)
        .then((res) => {
          setData(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);
  useEffect(() => {
    setCheckedObj(convert(value));
  }, [value]);

  return (
    <div className="border border-solid border-border">
      <div className="bg bg-divider p-1.5">
        <Input.Search
          value={keyword}
          className="py-0.5"
          placeholder="搜索"
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={onSearch}
        />
      </div>
      <AntList className="max-h-[200px] overflow-auto px-2.5" loading={loading}>
        {data?.map((item) => (
          <AntList.Item key={item.value} className="my-1">
            <Checkbox checked={checkedObj[item.value]} onChange={(val) => handleChange(val, item)}>
              {item.label}
            </Checkbox>
          </AntList.Item>
        ))}
      </AntList>
    </div>
  );
}

export default List;
