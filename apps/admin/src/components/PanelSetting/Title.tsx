function PanelTitle({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center">
      <span className="mr-2 text-lg text-primary [text-shadow:2px_2px_2px_theme(colors.primary/0.3),-1px_-1px_theme(colors.white)]">
        {title}
      </span>
      <span className="block h-px flex-1 bg-[#efeff5]"></span>
    </div>
  );
}

export default PanelTitle;
