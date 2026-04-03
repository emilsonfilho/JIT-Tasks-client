export default function SectionTitle(props) {
  return (
    <h3
      className={`uppercase tracking-widest font-semibold text-slate-400 ${props.className}`}
    >
      {props.children}
    </h3>
  );
}
