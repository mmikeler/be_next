

export function Alert(props: any) {
  const defaultCSS = 'p-2 text-sm border-l-4';
  let mod = '';

  switch (props.type) {
    case 'warning':
      mod = "bg-amber-100 border-amber-500";
      break;

    default:
      mod = "bg-sky-100  border-sky-500";
      break;
  }

  return (
    <div className={(props.className || '') + ' ' + defaultCSS + ' ' + mod}>
      {props.children}
    </div>
  )
}