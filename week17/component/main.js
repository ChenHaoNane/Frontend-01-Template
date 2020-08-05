import { createElement, Text, Wrapper } from './createElement';
// import { Carousel } from './carousel.js'
import {Panel} from './Panel.js'
import {TabPanel} from './TabPanel.js'

// window.addEventListener('selectstart', e => e.preventDefault())
// document.addEventListener('contextmenu', e => e.preventDefault())
// document.addEventListener('touchmove', e => e.preventDefault(), { passive: true })

// let component = <Carousel data={[
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
// ]}>
// </Carousel>

// component.mountTo(document.body)
// let component = <Panel title="this is title">
//   <span>content</span>
// </Panel>
// component.mountTo(document.body)

let component = <TabPanel>
  <span title="this is my title1">content1</span>
  <span title="this is my title2">content2</span>
  <span title="this is my title3">content3</span>
  <span title="this is my title4">content4</span>
</TabPanel>
component.mountTo(document.body)

