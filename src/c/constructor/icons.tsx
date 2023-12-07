import { Icon } from "../ui/icon";

export function Type_Icon({ type }: { type: string }) {
  switch (type) {
    case 'block':
      return (<Icon tag="square" />)

    case 'text':
      return (<Icon tag="insert_text" />)

    case 'image':
      return (<Icon tag="image" />)

    case 'code':
      return (<Icon tag="code" />)

    default:
      break;
  }
}