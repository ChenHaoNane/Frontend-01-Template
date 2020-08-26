import { createElement, Text, Wrapper } from './createElement';

export class Panel {
    constructor() { // config
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    setAttribute(name, value) { // attribute
        this[name] = value
    }

    appendChild(child) {
      this.children.push(child);
    }

    render() {
        return <div class="panel" style="width:300px;height:300px;border:1px solid;">
          <h1 style="background-color:green;width:300px;">{this.title}</h1>
          <div>{this.children}</div>
        </div>;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}