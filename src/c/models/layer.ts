import { parse, stringify } from "transform-parser";
import { parseProp } from "../profile/minisites/client";
import { debounce, isNumber, round } from "lodash";

export class Layer {
  id: string
  innerHTML: string
  innerText: string
  layerType: string
  timer: {
    date: string,
    time: string,
    delimeter: string,
    parts: {
      days: boolean,
      hours: boolean,
      minutes: boolean,
      seconds: boolean,
      text: boolean
    },
    endText: string
  }
  link: {
    href: string
  }
  src: string
  style: any
  fontClass: string
  transform: any
  title: string
  node: HTMLElement | null
  update: any

  constructor(layer: any, updAction: any) {

    this.id = layer.id;
    this.innerHTML = layer.innerHTML;
    this.innerText = layer.innerText;
    this.layerType = layer.layerType;
    this.timer = layer.timer;
    this.link = layer.link;
    this.src = layer.src;
    this.style = { ...layer.style };
    this.fontClass = layer.fontClass;
    this.transform = parse(this.style.transform);
    this.title = layer.title;
    this.node = document.getElementById(this.id) || null;
    this.update = debounce((propName: string, propValue: string) => {
      updAction(layer.id, {
        ...layer,
        style: {
          ...this.style,
          transform: stringify(this.transform)
        },
      })
    }, 1000);
  }

  public updateCSS(propName: string | any, propValue: string) {
    if (this.node) {
      this.node.style[propName] = propValue;
    }
  }

  public getProp(prop: string) {
    let out = 0;
    switch (prop) {
      case 'translateX':
        out = this.transform?.translate?.[0] || 0;
        break;

      case 'translateY':
        out = this.transform?.translate?.[1] || 0;
        break;

      case 'zIndex':
        out = this.style.zIndex || 50;
        break;

      case 'opacity':
      case 'lineHeight':
        out = this.style[prop] || 1;
        break;

      case 'rotate':
        out = round(this.transform?.rotate?.replace('deg', '')) || 0;
        break;

      default:
        out = parseProp(this.style[prop]);
        break;
    }
    return out;
  }
  /**
   * setCSSProp
   */
  public setCSSProp(e: any) {
    if (!e || !e.target) return;

    const name = e.target.name;
    const value = isNumber(e.target.value)
      ? round(e.target.value, 1).toString()
      : e.target.value;

    switch (name) {
      case 'translateX':
        this.transform.translate[0] = value + 'px';
        this.updateCSS('transform', stringify(this.transform));
        break;

      case 'translateY':
        this.transform.translate[1] = value + 'px';
        this.updateCSS('transform', stringify(this.transform));
        break;

      case 'zIndex':
      case 'opacity':
      case 'lineHeight':
      case 'textAlign':
        this.style[name] = value;
        this.updateCSS(name, value);
        break;

      case 'rotate':
        this.transform.rotate = value + 'deg';
        this.updateCSS('transform', stringify(this.transform));
        break;

      default:
        this.style[name] = value + 'px';
        this.updateCSS(name, this.style[name]);
        break;
    }

    this.update();
  }

  /**
   * set root prop
   */
  public setRootProp(e: any) {
    if (!e || !e.target) return;

    const name: string = e.target.name;
    const value: string | number = isNumber(e.target.value)
      ? round(e.target.value, 1).toString()
      : e.target.value;

    switch (name) {
      case 'any':
        //
        break;

      default:
        this[name as keyof Layer] = value;
        break;
    }
  }
  /**
   * get root prop
   */
  public getRootProp(propName: string) {
    let value: string | number = 0;
    switch (propName) {
      case 'any':
        break;

      default:
        value = this[propName as keyof Layer]
        break;
    }
    return value;
  }
}