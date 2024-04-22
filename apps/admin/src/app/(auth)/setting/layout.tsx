import Main from '@/components/Main';

function SettingLayout({ children }: { children: React.ReactNode }) {
  return <Main className="bg-white px-4 py-8">{children}</Main>;
}

export default SettingLayout;
