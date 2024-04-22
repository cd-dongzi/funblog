import Button from '@/components/Button';
import { useStore } from '@/context';

function Tags() {
  const { tagList = [] } = useStore();
  return (
    <>
      {tagList.map((tag) => (
        <Button key={tag.id} className="mr-1.5 mt-2">
          {tag.name}
        </Button>
      ))}
    </>
  );
}

export default Tags;
