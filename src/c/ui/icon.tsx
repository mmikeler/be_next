

export function Icon(props: any) {
  return (
    <span className={`material-symbols-outlined ${props.className}`}>{props.tag}</span>
  )
}