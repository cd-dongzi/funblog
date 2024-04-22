import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@funblog/utils';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import React from 'react';

let mdStyle = fs.readFileSync(path.resolve(process.cwd(), 'assets/md.css'), 'utf-8').toString();
postcss([autoprefixer])
  .process(mdStyle, { from: undefined })
  .then((result) => {
    mdStyle = result.css;
  });
// const mdStyle = fs.readFileSync(path.resolve(process.cwd(), 'assets/md.css'), 'utf-8').toString();
const colors = {
  a: '#20a0ff',
  text: '#475669',
  sub_text: '#657487',
  theme: '#db6f4e',
  bg: '#f4f5f5',
};
const Main = ({ children }: { children: any }) => {
  return (
    <main
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        position: 'relative',
        color: colors.sub_text,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: mdStyle }}></style>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          boxShadow: '0 3px 6px rgba(31, 45, 61, 0.1)',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '20px',
          bottom: '-3px',
          left: 0,
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          backgroundColor: colors.theme,
          zIndex: 1,
        }}
      ></div>
    </main>
  );
};
const A = ({ href, children }: { href?: string; children: any }) => {
  return (
    <a
      href={href}
      target="_blank"
      style={{
        textDecoration: 'none',
        color: colors.a,
      }}
    >
      {children}
    </a>
  );
};
const Strong = ({ children }: { children: any }) => {
  return <strong style={{ color: colors.theme }}>{children}</strong>;
};
const Header = ({ title, children }: { title: string; children?: any }) => {
  return (
    <header
      style={{
        textAlign: 'center',
        paddingBottom: '20px',
        borderBottom: '1px solid #eee',
        boxShadow: '0 1px hsl(0deg 0% 100% / 50%)',
      }}
    >
      <img
        src="https://assets-open.dzblog.cn/images/other/google_flush.gif"
        alt="Google"
        style={{
          width: '100%',
          display: 'block',
        }}
      />
      <h1 style={{ fontSize: '20px', color: '#475669' }}>{title}</h1>
      {children && (
        <div
          style={{
            fontSize: '16px',
            color: colors.sub_text,
            marginTop: '6px',
            padding: '0 10px',
          }}
        >
          {children}
        </div>
      )}
    </header>
  );
};
const Remind = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        fontSize: '16px',
        color: colors.sub_text,
        marginTop: '6px',
        padding: '0 10px',
      }}
    >
      {children}
    </div>
  );
};
const Box = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        backgroundColor: colors.bg,
        padding: '15px 10px',
      }}
    >
      {children}
    </div>
  );
};
const MdContainer = ({ html }: { html: string }) => {
  return (
    <div
      style={{
        padding: '15px 10px',
        boxShadow: '0 2px 3px rgba(31, 45, 61, 0.1)',
      }}
      className="md-container"
      dangerouslySetInnerHTML={{
        __html: parseMarkdown(html),
      }}
    ></div>
  );
};

const Section = ({ title, children, html }: { title?: any; children?: any; html?: string }) => {
  return (
    <section
      style={{
        padding: '10px',
        marginTop: '10px',
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '14px',
            margin: '0 0 10px 0',
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
      )}
      {children && <Box>{children}</Box>}
      {html && <MdContainer html={html} />}
    </section>
  );
};

const Ul = ({ children }: { children: any }) => {
  return <ul style={{ margin: 0, padding: 0 }}>{children}</ul>;
};
const Li = ({ label, value, href, last }: { label: string; value?: string; href?: string; last?: boolean }) => {
  return (
    <li style={{ marginBottom: last ? 0 : '10px', listStyle: 'none', padding: 0 }}>
      {label}
      {value}
      {href && <A href={href}>{href}</A>}
    </li>
  );
};

const LookBtn = ({ href, children }: { href?: string; children: any }) => {
  return (
    <A href={href}>
      <button
        style={{
          backgroundColor: 'transparent',
          outline: 'none',
          cursor: 'pointer',
          border: `1px solid ${colors.theme}`,
          color: colors.theme,
          fontSize: '14px',
          width: '120px',
          lineHeight: '34px',
          borderRadius: '17px',
          display: 'block',
          margin: '0 auto',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        {children}
      </button>
    </A>
  );
};

const ComeBack = ({ href, title }: { href?: string; title?: string }) => {
  return (
    <p style={{ marginBottom: '20px', textAlign: 'center' }}>
      欢迎再来{' '}
      <A href={href}>
        <Strong>{title}</Strong>
      </A>{' '}
      玩！
    </p>
  );
};

export { Main, Strong, Header, Remind, Section, Ul, Li, LookBtn, ComeBack };
