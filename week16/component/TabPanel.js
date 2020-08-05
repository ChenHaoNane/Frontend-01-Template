import { createElement, Text, Wrapper } from './createElement';

export class TabPanel {
    constructor() { // config
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    setAttribute(name, value) { // attribute
        this[name] = value
    }
    getAttribute(name) { // attribute
        return this[name]
    }

    appendChild(child) {
      this.children.push(child);
    }

    select(i) {
      for (let title of this.titleViews) {
        title.style.display = 'none'
      }
      this.titleViews[i].style.display = ''
      for (let content of this.contentViews) {
        content.style.display = 'none'
      }
      this.contentViews[i].style.display = ''
    }

    render() {
      this.titleViews = this.children.map((item) => {
        return <div style="width:300px;height:100px;">{item.getAttribute('title') || ''}</div>
      })
      this.contentViews = this.children.map((item) => {
        return <div style="width:300px;height:100px;">{item}</div>
      })
      console.log('this.contentViews', this.contentViews)
      setTimeout(this.select(0), 16)
      return <div class="panel" style="width:300px;border:1px solid;">
        { this.titleViews }
        { this.contentViews }
      </div>;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}