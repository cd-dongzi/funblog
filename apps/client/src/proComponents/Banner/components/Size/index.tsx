import cls from 'classnames';
function BannerSize({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cls(
        '[--w:170px] md:[--w:190px] lg:[--w:250px] xl:[--w:280px]',
        '[--h:152px] md:[--h:170px] lg:[--h:224px] xl:[--h:250px]',
        '[--x:6.4em] lg:[--x:8em]',
        '[--x1:9em] lg:[--x1:11em]',
        '[--x2:11em] lg:[--x2:13em]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default BannerSize;
