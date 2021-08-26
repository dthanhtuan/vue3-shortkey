// import {expect} from 'chai'
// import {  createApp, nextTick } from 'vue';
// import Shortkey from '../src/index.js'
//
//
// const VM = template => createApp({
//   template,
//   data() {
//     return {
//       called: false,
//       calledBubble: false
//     }
//   },
//   methods: {
//     foo() {
//       this.called = true
//     },
//     bar() {
//       this.calledBubble = true
//     }
//   }
// })
// VM.use(Shortkey, { prevent: ['.disableshortkey', '.disableshortkey textarea'] })

// function createEvent(name='keydown') {
//   const event = document.createEvent('HTMLEvents')
//   event.initEvent(name, false, true)
//   return event
// }
//
// describe('Index.js', () => {
//   describe('fn.decodeKey', () => {
//     it('Return single key', () => {
//       expect(Shortkey.decodeKey({key: 'Shift'})).to.equal('shift')
//       expect(Shortkey.decodeKey({key: 'Control'})).to.equal('ctrl')
//       expect(Shortkey.decodeKey({key: 'Meta'})).to.equal('meta')
//       expect(Shortkey.decodeKey({key: 'Alt'})).to.equal('alt')
//       expect(Shortkey.decodeKey({key: 'Enter'})).to.equal('enter')
//       expect(Shortkey.decodeKey({key: ' '})).to.equal('space')
//     })
//
//     it('Return a combined key', () => {
//       expect(Shortkey.decodeKey({altKey: true, key: 'a'})).to.equal('alta')
//       expect(Shortkey.decodeKey({altKey: true, ctrlKey: true, key: 'a'})).to.equal('ctrlalta')
//     })
//   })
// })
//
// describe('functionnal tests', () => {
//
//   const createDiv = () => {
//     const div = document.createElement('div')
//     document.body.appendChild(div)
//     return div
//   }
//
//   describe('Dispatch triggered event', () => {
//     it('listen for keydown and dispatch simple event', () => {
//       const vm = new VM('<div @shortkey="foo" v-shortkey="[\'q\']"></div>')
//       vm.mount(createDiv())
//
//       const keydown = createEvent('keydown')
//       keydown.key = 'q'
//       document.dispatchEvent(keydown)
//
//       const keyup = createEvent('keyup')
//       keyup.key = 'q'
//       document.dispatchEvent(keyup)
//
//       expect(vm.called).to.be.true
//       vm.unmount()
//     })
//
//     it('unbind simple events', () => {
//       const vm = new VM('<div @shortkey="foo" v-shortkey="[\'q\']"></div>')
//       vm.mount(createDiv())
//
//       vm.unmount()
//
//       const keydown = createEvent('keydown')
//       keydown.key = 'q'
//       document.dispatchEvent(keydown)
//
//       const keyup = createEvent('keyup')
//       keyup.key = 'q'
//       document.dispatchEvent(keyup)
//
//       expect(vm.called).to.be.false
//     });
//
//     it('listen for keydown and dispatch event with object key', (done) => {
//       const vm = new VM('<div @shortkey="foo" v-shortkey="{option1: [\'q\'], option2: [\'a\']}"></div>')
//
//       const stubFoo = sinon.stub(vm, 'foo').callsFake(fn => {
//         expect(fn.srcKey).to.equal('option1')
//         stubFoo.restore()
//         vm.unmount()
//         done()
//       })
//       vm.mount(createDiv())
//
//       const keydown = createEvent('keydown')
//       keydown.key = 'q'
//       document.dispatchEvent(keydown)
//
//       const keyup = createEvent('keyup')
//       keyup.key = 'q'
//       document.dispatchEvent(keyup)
//
//       expect(vm.called).to.be.true
//     })
//
//     it('unbind event with object key', () => {
//       const vm = new VM('<div @shortkey="foo" v-shortkey="{option1: [\'q\'], option2: [\'a\']}"></div>')
//       vm.mount(createDiv())
//       vm.unmount()
//
//       const keydown = createEvent('keydown')
//       keydown.key = 'q'
//       document.dispatchEvent(keydown)
//
//       const keyup = createEvent('keyup')
//       keyup.key = 'q'
//       document.dispatchEvent(keyup)
//
//       expect(vm.called).to.be.false
//     })
//   })
//
//   it('Testing ? key', () => {
//     const vm = new VM(`<button @shortkey="foo" v-shortkey="['shift', '?']"></button>`)
//     vm.mount(createDiv())
//
//     const keydown = createEvent('keydown')
//     keydown.shiftKey = true
//     keydown.key = '?'
//     document.dispatchEvent(keydown)
//
//     const keyup = createEvent('keyup')
//     keydown.shiftKey = true
//     keydown.key = '?'
//     document.dispatchEvent(keyup)
//
//     expect(vm.called).to.be.true
//     vm.unmount()
//   })
//
//   it("Update the binding", (done) => {
//     const vm = VM(`<div>
//                       <div v-if="!called" class="first" @shortkey="foo" v-shortkey="[\'q\']">foo</div>
//                       <div v-else         class="test"  @shortkey="bar" v-shortkey="[\'g\']">bar</div>
//                     </div>`)
//     vm.mount(createDiv())
//     const keydown = createEvent('keydown')
//     keydown.key = 'q'
//     document.dispatchEvent(keydown)
//
//     const keyup = createEvent('keyup')
//     keydown.key = 'q'
//     document.dispatchEvent(keyup)
//
//     expect(vm.called).to.be.true
//     nextTick(() => {
//       const keydown2 = createEvent('keydown')
//       keydown2.key = 'g'
//       document.dispatchEvent(keydown2)
//
//       const keyup2 = createEvent('keyup')
//       keydown2.key = 'g'
//       document.dispatchEvent(keyup2)
//
//       expect(vm.calledBubble).to.be.true
//       vm.unmount()
//       done()
//     })
//   })
//
//   it('Prevent bubble event', () => {
//     const vm = new VM('<div @shortkey="bar" v-shortkey="[\'a\']"><button type="button" @shortkey="foo" v-shortkey="[\'b\']">TEST</button></div>')
//     vm.mount(createDiv())
//     const keydown = createEvent('keydown')
//     keydown.key = 'b'
//     document.dispatchEvent(keydown)
//
//     expect(vm.called).to.be.true
//     expect(vm.calledBubble).to.be.false
//     vm.unmount()
//   })
// })
