function NormalImage(props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={props.src || undefined} />;
}

export default NormalImage;
