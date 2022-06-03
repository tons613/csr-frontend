export default function Container({ children, style }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="md:max-w-xl max-w-sm w-96" style={style}>
        {children}
      </div>
    </div>
  );
}
