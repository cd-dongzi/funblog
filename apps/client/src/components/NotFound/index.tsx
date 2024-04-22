import cls from 'classnames';
import Link from '@/components/Link';
function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cls(
        'absolute left-1/2 top-1/2 flex flex-col items-center justify-center [transform:translate(-50%,-50%)]',
        className,
      )}
    >
      <h1 className="mb-10 text-center text-[42px] shadow-text">Lost</h1>
      <div className="mb-8 h-px w-8 bg-gray/30"></div>
      <p className="shadow-text-banner text-center leading-6">
        放眼望去，这里一片荒芜，只剩苍茫大地……
        <br />
        疲惫的旅人，您迷路了吗？
      </p>
      <Link href="/" className="background-to-gray transition-all-3 mt-4 rounded-full px-6 py-2 hover:px-8">
        带我回家
      </Link>
    </div>
  );
}

export default NotFound;
